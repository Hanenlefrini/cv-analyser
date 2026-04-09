import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const ProcessingIllustration = (): JSX.Element => (
  <div className="flex items-center justify-center py-8">
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 border-4 border-purple-300 rounded-lg rotate-12 animate-pulse"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DocumentTextIcon className="w-20 h-20 text-purple-600 animate-bounce" style={{ animationDuration: '1.5s' }} />
      </div>
    </div>
  </div>
);

