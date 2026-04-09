'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { AnalysisResult } from '@/lib/api';

interface MatchRateCardProps {
  analysis: AnalysisResult;
  matchRate: number;
}

export function MatchRateCard({ analysis, matchRate }: MatchRateCardProps): JSX.Element {
  const router = useRouter();

  return (
    <Card className="sticky top-4 z-10">
      <CardHeader>
        <CardTitle className="text-lg">Match Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - matchRate / 100)}`}
                className="text-green-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">{Math.round(matchRate)}%</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => router.push('/')}
        >
          Upload & rescan
        </Button>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-900">Experience</span>
              <span className="text-slate-600">{analysis.scores.experience}%</span>
            </div>
            <Progress value={analysis.scores.experience} className="h-2 [&>div]:bg-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-900">Skills</span>
              <span className="text-slate-600">{analysis.scores.skills}%</span>
            </div>
            <Progress value={analysis.scores.skills} className="h-2 [&>div]:bg-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-900">Education</span>
              <span className="text-slate-600">{analysis.scores.education}%</span>
            </div>
            <Progress value={analysis.scores.education} className="h-2 [&>div]:bg-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

