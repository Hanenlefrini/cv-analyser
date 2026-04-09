'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ClockIcon } from '@heroicons/react/24/outline';

export function HistoryHeader(): JSX.Element {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          New Analysis
        </Button>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <ClockIcon className="w-8 h-8" />
          <h1 className="text-4xl md:text-5xl font-bold">Analysis History</h1>
        </div>
        <p className="text-muted-foreground text-lg">View all your previous CV analyses</p>
      </div>
    </>
  );
}








