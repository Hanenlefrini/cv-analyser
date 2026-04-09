'use client';

import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import { getAnalysisById } from '@/lib/api';
import type { AnalyzeResponse } from '@/lib/api';

export function useAnalysisQuery(analysisId: string | null): ReturnType<typeof useQuery<AnalyzeResponse, Error>> {
  const { currentAnalysis, setCurrentAnalysis } = useStore();

  return useQuery<AnalyzeResponse, Error>({
    queryKey: ['analysis', analysisId],
    queryFn: async (): Promise<AnalyzeResponse> => {
      if (!analysisId) {
        throw new Error('Analysis ID is required');
      }

      if (currentAnalysis && currentAnalysis.id === analysisId) {
        return currentAnalysis;
      }

      const response = await getAnalysisById(analysisId);
      setCurrentAnalysis(response);
      return response;
    },
    enabled: !!analysisId,
    staleTime: 10 * 60 * 1000,
  });
}








