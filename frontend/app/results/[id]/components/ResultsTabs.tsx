'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReportTab } from './ReportTab';
import { JobDescriptionTab } from './JobDescriptionTab';
import type { AnalysisResult } from '@/lib/api';

interface ResultsTabsProps {
  activeTab: 'report' | 'job';
  setActiveTab: (tab: 'report' | 'job') => void;
  analysis: AnalysisResult;
  jobDescription: string;
}

export function ResultsTabs({
  activeTab,
  setActiveTab,
  analysis,
  jobDescription,
}: ResultsTabsProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('report')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'report'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume Report
          </button>
          <button
            onClick={() => setActiveTab('job')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'job'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Description
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeTab === 'report' && <ReportTab analysis={analysis} />}
        {activeTab === 'job' && <JobDescriptionTab jobDescription={jobDescription} />}
      </CardContent>
    </Card>
  );
}



