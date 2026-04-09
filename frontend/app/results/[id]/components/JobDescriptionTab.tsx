interface JobDescriptionTabProps {
  jobDescription: string;
}

export function JobDescriptionTab({ jobDescription }: JobDescriptionTabProps): JSX.Element {
  if (jobDescription && jobDescription.trim()) {
    return (
      <div className="space-y-4">
        <div className="prose max-w-none">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">
              {jobDescription}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-slate-600">No job description available. This analysis may have been created before the update.</p>
      </div>
    </div>
  );
}








