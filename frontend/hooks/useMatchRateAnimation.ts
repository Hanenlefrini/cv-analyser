'use client';

import { useEffect, useState } from 'react';
import { calculateAverageScore } from '@/lib/utils';
import type { AnalysisResult } from '@/lib/api';

export function useMatchRateAnimation(analysis: AnalysisResult | null): number {
  const [matchRate, setMatchRate] = useState<number>(0);

  useEffect(() => {
    if (!analysis) {
      setMatchRate(0);
      return;
    }

    const target = calculateAverageScore(analysis);
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setMatchRate(Math.min(target * progress, target));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, [analysis]);

  return matchRate;
}








