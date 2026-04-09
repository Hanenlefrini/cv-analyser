import type { AnalysisResult } from '@/lib/api';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface ReportTabProps {
  analysis: AnalysisResult;
}

export function ReportTab({ analysis }: ReportTabProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Summary</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-700 leading-relaxed">{analysis.summary}</p>
        </div>
      </div>

      {analysis.strengths.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Strengths</h2>
          <div className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.concerns.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Concerns</h2>
          <div className="space-y-3">
            {analysis.concerns.map((concern, index) => (
              <div key={index} className="flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{concern}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.missingRequirements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Missing Requirements</h2>
          <div className="space-y-3">
            {analysis.missingRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start gap-3">
                <XCircleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}








