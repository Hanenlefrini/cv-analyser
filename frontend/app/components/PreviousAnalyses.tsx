'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  DocumentTextIcon,
  ClockIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { calculateAverageScore, formatDate } from '@/lib/utils';
import type { HistoryItem } from '@/lib/api';

interface PreviousAnalysesProps {
  analyses: HistoryItem[];
}

export function PreviousAnalyses({ analyses }: PreviousAnalysesProps): JSX.Element {
  const router = useRouter();

  if (analyses.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="w-5 h-5 text-slate-600" />
        <h2 className="text-xl font-bold text-slate-900">Previous Analyses</h2>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {analyses.map((analysis, index) => {
          const avgScore = calculateAverageScore(analysis.result);

          return (
            <Card
              key={analysis.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/results/${analysis.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <DocumentTextIcon className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-900">
                        Analysis #{analyses.length - index}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ClockIcon className="w-3 h-3" />
                      {formatDate(analysis.createdAt)}
                    </div>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-1">
                      {analysis.result.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{avgScore}%</div>
                      <div className="text-xs text-slate-500">Match</div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}








