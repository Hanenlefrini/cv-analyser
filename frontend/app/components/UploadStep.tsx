'use client';

import {
  DocumentArrowUpIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ProcessingIllustration } from '@/components/illustrations/processing-illustration';
import { isValidPDFFile } from '@/lib/utils';
import { PreviousAnalyses } from './PreviousAnalyses';
import type { HistoryItem } from '@/lib/api';

interface UploadStepProps {
  isUploading: boolean;
  uploadedFileName: string;
  onFileSelect: (file: File) => void;
  onFileError: (error: string) => void;
  analyses: HistoryItem[];
}

export function UploadStep({
  isUploading,
  uploadedFileName,
  onFileSelect,
  onFileError,
  analyses,
}: UploadStepProps): JSX.Element {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidPDFFile(file)) {
        onFileError('Only PDF files are allowed');
        return;
      }
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer bg-slate-50">
          {isUploading ? (
            <div className="space-y-4 pointer-events-none">
              <ProcessingIllustration />
              <p className="text-slate-600">Processing your CV...</p>
            </div>
          ) : uploadedFileName ? (
            <div className="space-y-4 pointer-events-none">
              <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto" />
              <div>
                <p className="font-medium text-slate-900">{uploadedFileName}</p>
                <p className="text-sm text-slate-600 mt-2">CV uploaded successfully</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pointer-events-none">
              <DocumentArrowUpIcon className="w-12 h-12 text-slate-400 mx-auto" />
              <div>
                <p className="font-medium mb-2 text-slate-900">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-600">PDF files only</p>
              </div>
            </div>
          )}
          <input
            id="cvFile"
            type="file"
            accept=".pdf,application/pdf"
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <PreviousAnalyses analyses={analyses} />
    </div>
  );
}

