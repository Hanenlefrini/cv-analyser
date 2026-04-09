'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import { uploadCV } from '@/lib/api';
import type { UploadResponse } from '@/lib/api';

interface UploadVariables {
  file: File;
  browserId: string;
}

export function useUploadMutation() {
  const queryClient = useQueryClient();
  const { setError } = useStore();

  return useMutation<UploadResponse, Error, UploadVariables>({
    mutationFn: async (variables: UploadVariables): Promise<UploadResponse> => {
      const { file, browserId } = variables;
      return uploadCV(file, browserId);
    },
    onError: (error: Error): void => {
      setError(error.message);
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}

