import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function LoadingState(): JSX.Element {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-animated-gradient"></div>
      <div className="relative z-10 text-center space-y-4">
        <ArrowPathIcon className="w-12 h-12 text-slate-400 animate-spin mx-auto" />
        <p className="text-slate-600 text-lg">Loading analysis...</p>
      </div>
    </div>
  );
}








