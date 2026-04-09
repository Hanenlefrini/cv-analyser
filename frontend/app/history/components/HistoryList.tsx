'use client';

import { HistoryCard } from './HistoryCard';
import type { HistoryItem } from '@/lib/api';

interface HistoryListProps {
  analyses: HistoryItem[];
}

export function HistoryList({ analyses }: HistoryListProps): JSX.Element {
  return (
    <div className="grid gap-6">
      {analyses.map((analysis, index) => (
        <HistoryCard
          key={analysis.id}
          analysis={analysis}
          index={index}
          totalCount={analyses.length}
        />
      ))}
    </div>
  );
}








