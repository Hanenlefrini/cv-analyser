import { AnalyzingIllustration } from '@/components/illustrations/analyzing-illustration';

export function AnalyzingStep(): JSX.Element {
  return (
    <div className="space-y-6">
      <AnalyzingIllustration />
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-slate-900">Analyzing your CV...</p>
        <p className="text-sm text-slate-600">
          This may take a few moments. Please don&apos;t close this page.
        </p>
      </div>
    </div>
  );
}








