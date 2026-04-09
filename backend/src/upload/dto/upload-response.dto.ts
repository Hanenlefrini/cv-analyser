import { z } from 'zod';

export const UploadResponseSchema = z.object({
  cvText: z.string(),
});

export type UploadResponseDto = z.infer<typeof UploadResponseSchema>;








