'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useAnalysisQuery } from './queries/useAnalysisQuery';
import { useMatchRateAnimation } from './useMatchRateAnimation';
import type { AnalysisResult } from '@/lib/api';

interface UseAnalysisReturn {
  analysis: AnalysisResult | null;
  jobDescription: string;
  cvText: string;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  matchRate: number;
  activeTab: 'report' | 'job';
  setActiveTab: (tab: 'report' | 'job') => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const params = useParams();
  const { setLoading, setError } = useStore();
  const analysisId = (params.id as string) || null;
  const { data, isLoading, error: queryError } = useAnalysisQuery(analysisId);
  const [activeTab, setActiveTab] = useState<'report' | 'job'>('report');
  
  const matchRate = useMatchRateAnimation(data?.result || null);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    } else {
      setError(null);
    }
  }, [queryError, setError]);

  return {
    analysis: data?.result || null,
    jobDescription: data?.jobDescription || '',
    cvText: data?.cvText || '',
    cvFilePath: data?.cvFilePath || null,
    cvFileName: data?.cvFileName || null,
    cvMimeType: data?.cvMimeType || null,
    matchRate,
    activeTab,
    setActiveTab,
  };
}

