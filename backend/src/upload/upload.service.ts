import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';
import { FileUpload } from './interfaces/file-upload.interface';
import pdfParse from 'pdf-parse';

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async extractText(file: FileUpload, browserId: string): Promise<string> {
    const mimeType = file.mimetype;
    const buffer = file.buffer;
    const cvFileName = file.originalname;

    if (mimeType !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    const cvText = await this.extractFromPdf(buffer);

    let uploadResult;
    try {
      uploadResult = await this.cloudinaryService.uploadFile(
        buffer,
        cvFileName,
        'cv-analyzer',
      );
    } catch (error) {
      throw new BadRequestException(`Failed to upload file to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    const cvFilePath = uploadResult.secureUrl;

    let userSession = await this.prisma.userSession.findUnique({
      where: { browserId },
    });

    if (!userSession) {
      userSession = await this.prisma.userSession.create({
        data: { browserId, cvText, cvFilePath, cvFileName, cvMimeType: mimeType },
      });
    } else {
      await this.prisma.userSession.update({
        where: { browserId },
        data: { cvText, cvFilePath, cvFileName, cvMimeType: mimeType },
      });
    }

    return cvText;
  }

  private async extractFromPdf(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      if (data.text && data.text.trim().length > 0) {
        return data.text;
      }
      throw new BadRequestException('PDF appears to be a scanned document or image-based PDF. Text extraction failed. Please upload a text-based PDF.');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

