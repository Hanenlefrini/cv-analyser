'use client';

import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/lib/store';
import { getHistory } from '@/lib/api';
import type { HistoryResponse } from '@/lib/api';

export function useHistoryQuery(): ReturnType<typeof useQuery<HistoryResponse, Error>> {
  const { browserId, initializeBrowserId } = useStore();

  return useQuery<HistoryResponse, Error>({
    queryKey: ['history', browserId],
    queryFn: async (): Promise<HistoryResponse> => {
      if (!browserId) {
        initializeBrowserId();
        throw new Error('Browser ID not initialized');
      }
      return getHistory(browserId);
    },
    enabled: !!browserId,
    staleTime: 2 * 60 * 1000,
  });
}








