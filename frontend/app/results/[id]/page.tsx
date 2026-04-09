'use client';

import { useAnalysis } from '@/hooks/useAnalysis';
import { LoadingState } from './components/LoadingState';
import { ResultsHeader } from './components/ResultsHeader';
import { MatchRateCard } from './components/MatchRateCard';
import { ResultsTabs } from './components/ResultsTabs';

export default function ResultsPage(): JSX.Element {
  const {
    analysis,
    jobDescription,
    matchRate,
    activeTab,
    setActiveTab,
  } = useAnalysis();

  if (!analysis) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-animated-gradient"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative z-10">
        <div className="container mx-auto py-8 px-4">
          <ResultsHeader />
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MatchRateCard analysis={analysis} matchRate={matchRate} />
            </div>
            <div className="lg:col-span-3">
              <ResultsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                analysis={analysis}
                jobDescription={jobDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
