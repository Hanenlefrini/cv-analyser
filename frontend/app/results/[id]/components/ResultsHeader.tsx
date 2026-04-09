'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export function ResultsHeader(): JSX.Element {
  const router = useRouter();

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => router.push('/')}
        className="mb-4"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back
      </Button>
      <h1 className="text-2xl font-bold text-slate-900">Resume scan results</h1>
    </div>
  );
}








