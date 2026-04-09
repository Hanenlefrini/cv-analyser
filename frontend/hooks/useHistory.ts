'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useHistoryQuery } from './queries/useHistoryQuery';

export function useHistory(): void {
  const { initializeBrowserId, setAnalyses, setLoading, setError } = useStore();
  const { data, isLoading, error } = useHistoryQuery();

  useEffect(() => {
    initializeBrowserId();
  }, [initializeBrowserId]);

  useEffect(() => {
    if (data) {
      setAnalyses(data.analyses);
    }
  }, [data, setAnalyses]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (error) {
      setError(error.message);
    } else {
      setError(null);
    }
  }, [error, setError]);
}

