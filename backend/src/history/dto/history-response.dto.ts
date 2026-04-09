import { z } from 'zod';
import { AnalysisResultSchema } from '../../analyze/dto/analyze-response.dto';

export const HistoryItemSchema = z.object({
  id: z.string().uuid(),
  result: AnalysisResultSchema,
  jobDescription: z.string(),
  cvText: z.string(),
  cvFilePath: z.string().nullable(),
  cvFileName: z.string().nullable(),
  cvMimeType: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type HistoryItem = z.infer<typeof HistoryItemSchema>;

export const HistoryResponseSchema = z.object({
  analyses: z.array(HistoryItemSchema),
});

export type HistoryResponseDto = z.infer<typeof HistoryResponseSchema>;

