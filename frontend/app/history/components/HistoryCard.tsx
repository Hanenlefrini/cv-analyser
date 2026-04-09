'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  DocumentTextIcon,
  ClockIcon,
  BriefcaseIcon,
  SparklesIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { calculateAverageScore, formatDate } from '@/lib/utils';
import type { HistoryItem } from '@/lib/api';

interface HistoryCardProps {
  analysis: HistoryItem;
  index: number;
  totalCount: number;
}

export function HistoryCard({ analysis, index, totalCount }: HistoryCardProps): JSX.Element {
  const router = useRouter();
  const avgScore = calculateAverageScore(analysis.result);

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/results/${analysis.id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5" />
              <CardTitle>Analysis #{totalCount - index}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {formatDate(analysis.createdAt)}
            </CardDescription>
          </div>
          <div className="text-right ml-4">
            <div className="text-3xl font-bold">
              {avgScore}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Average Score</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <span>
                {analysis.result.scores.experience}%
              </span>
            </div>
            <Progress 
              value={analysis.result.scores.experience} 
              className="h-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                <span>Skills</span>
              </div>
              <span>
                {analysis.result.scores.skills}%
              </span>
            </div>
            <Progress 
              value={analysis.result.scores.skills} 
              className="h-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-4 h-4" />
                <span>Education</span>
              </div>
              <span>
                {analysis.result.scores.education}%
              </span>
            </div>
            <Progress 
              value={analysis.result.scores.education} 
              className="h-2"
            />
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {analysis.result.summary}
          </p>
        </div>
        <div className="flex items-center gap-2 text-primary text-sm">
          <span>View Details</span>
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}

