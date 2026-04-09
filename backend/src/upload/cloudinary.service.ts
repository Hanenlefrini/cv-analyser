import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const cloudinaryUrl = this.configService.get<string>('CLOUDINARY_URL');
    if (!cloudinaryUrl) {
      throw new Error('CLOUDINARY_URL environment variable is required');
    }
    cloudinary.config(cloudinaryUrl);
  }

  async uploadFile(
    buffer: Buffer,
    fileName: string,
    folder: string = 'cv-analyzer',
  ): Promise<{ url: string; publicId: string; secureUrl: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'raw',
          type: 'upload',
          use_filename: true,
          unique_filename: true,
          access_control: [
            {
              access_type: 'anonymous',
            },
          ],
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined): void => {
          if (error) {
            reject(new Error(error.message || 'Cloudinary upload failed'));
            return;
          }
          if (!result) {
            reject(new Error('Upload failed: No result from Cloudinary'));
            return;
          }
          resolve({
            url: result.url || '',
            publicId: result.public_id || '',
            secureUrl: result.secure_url || '',
          });
        },
      );

      uploadStream.end(buffer);
    });
  }
}

