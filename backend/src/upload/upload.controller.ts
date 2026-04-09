import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Headers,
  Param,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import { UploadResponseDto } from './dto/upload-response.dto';
import { FileUpload } from './interfaces/file-upload.interface';
import { PrismaService } from '../prisma/prisma.service';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (_req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(new Error('Only PDF files are allowed'), false);
        }
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: MulterFile | undefined,
    @Headers('x-browser-id') browserId: string | undefined,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!browserId) {
      throw new BadRequestException('Browser ID is required in headers');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    const fileUpload: FileUpload = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
    };

    const cvText = await this.uploadService.extractText(fileUpload, browserId);

    return {
      cvText,
    };
  }

  @Get('file/:analysisId')
  @Redirect()
  async getFile(@Param('analysisId') analysisId: string): Promise<{ url: string }> {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id: analysisId },
    });

    if (!analysis || !analysis.cvFilePath) {
      throw new NotFoundException('CV file not found');
    }

    return { url: analysis.cvFilePath };
  }
}

