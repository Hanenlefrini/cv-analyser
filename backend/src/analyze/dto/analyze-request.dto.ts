import { z } from 'zod';

export const AnalyzeRequestSchema = z.object({
  jobDescription: z.string().min(1),
});

export type AnalyzeRequestDto = z.infer<typeof AnalyzeRequestSchema>;

