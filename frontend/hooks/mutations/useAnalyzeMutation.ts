'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import { analyzeCV, getHistory } from '@/lib/api';
import type { AnalyzeResponse, AnalyzeRequest } from '@/lib/api';

interface AnalyzeVariables {
  request: AnalyzeRequest;
  browserId: string;
}

export function useAnalyzeMutation() {
  const queryClient = useQueryClient();
  const { setError, setCurrentAnalysis, setAnalyses } = useStore();

  return useMutation<AnalyzeResponse, Error, AnalyzeVariables>({
    mutationFn: async (variables: AnalyzeVariables): Promise<AnalyzeResponse> => {
      const { request, browserId } = variables;
      const response = await analyzeCV(request, browserId);
      setCurrentAnalysis(response);
      
      const historyResponse = await getHistory(browserId);
      setAnalyses(historyResponse.analyses);
      
      return response;
    },
    onError: (error: Error): void => {
      setError(error.message);
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}

