'use client';

import { useStore } from '@/lib/store';
import { useHistory } from '@/hooks/useHistory';
import { HistoryHeader } from './components/HistoryHeader';
import { EmptyHistory } from './components/EmptyHistory';
import { HistoryList } from './components/HistoryList';

export default function HistoryPage(): JSX.Element {
  const { analyses } = useStore();
  
  useHistory();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-animated-gradient"></div>
      <div className="relative z-10 container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <HistoryHeader />
          {analyses.length === 0 ? (
            <EmptyHistory />
          ) : (
            <HistoryList analyses={analyses} />
          )}
        </div>
      </div>
    </div>
  );
}
