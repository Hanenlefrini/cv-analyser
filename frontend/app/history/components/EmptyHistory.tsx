'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export function EmptyHistory(): JSX.Element {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="pt-12 pb-12 text-center">
        <div className="space-y-4">
          <DocumentTextIcon className="w-16 h-16 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground text-lg">No analyses yet</p>
          <p className="text-muted-foreground text-sm">Start by analyzing your first CV</p>
          <Button
            onClick={() => router.push('/')}
            className="mt-4"
          >
            Analyze CV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}








