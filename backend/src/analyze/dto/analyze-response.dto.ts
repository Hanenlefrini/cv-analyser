import { z } from 'zod';

export const AnalysisResultSchema = z.object({
  scores: z.object({
    experience: z.number().min(0).max(100),
    skills: z.number().min(0).max(100),
    education: z.number().min(0).max(100),
  }),
  missingRequirements: z.array(z.string()),
  strengths: z.array(z.string()),
  concerns: z.array(z.string()),
  summary: z.string(),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export const AnalyzeResponseSchema = z.object({
  id: z.string().uuid(),
  result: AnalysisResultSchema,
  jobDescription: z.string(),
  cvText: z.string(),
  cvFilePath: z.string().nullable(),
  cvFileName: z.string().nullable(),
  cvMimeType: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type AnalyzeResponseDto = z.infer<typeof AnalyzeResponseSchema>;

