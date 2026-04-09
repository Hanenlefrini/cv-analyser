'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { JOB_DESCRIPTIONS } from '@/lib/constants';

const formSchema = z.object({
  jobDescription: z.string().min(1, 'Job description is required'),
});

type FormData = z.infer<typeof formSchema>;

interface JobDescriptionStepProps {
  onSubmit: (data: FormData) => Promise<void>;
  onBack: () => void;
  selectedJobSample: string | null;
  onJobSampleSelect: (title: string, description: string) => void;
  isSubmitting: boolean;
}

export function JobDescriptionStep({
  onSubmit,
  onBack,
  selectedJobSample,
  onJobSampleSelect,
  isSubmitting,
}: JobDescriptionStepProps): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
    },
  });

  const handleJobSampleClick = (title: string, description: string): void => {
    onJobSampleSelect(title, description);
    setValue('jobDescription', description);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label htmlFor="jobDescription" className="block">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-900">Paste a Job Description below</span>
            </div>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              rows={16}
              className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
              {...register('jobDescription')}
              onChange={(e) => {
                setValue('jobDescription', e.target.value);
                onJobSampleSelect('', '');
              }}
            />
            {errors.jobDescription && (
              <p className="text-sm text-red-600 mt-2">{errors.jobDescription.message}</p>
            )}
          </label>
        </div>
        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center gap-2 mb-2">
              <DocumentTextIcon className="w-5 h-5 text-slate-600" />
              <span className="font-semibold text-slate-900">OR Use a Job Description Sample</span>
            </div>
            <div className="border border-slate-300 rounded-lg bg-white max-h-[400px] overflow-y-auto">
              {JOB_DESCRIPTIONS.map((job, index) => (
                <div
                  key={index}
                  onClick={() => handleJobSampleClick(job.title, job.description)}
                  className={`p-3 border-b border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors ${
                    selectedJobSample === job.title ? 'bg-purple-100 border-purple-300' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">{job.title}</span>
                    {selectedJobSample === job.title && (
                      <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            'Scan'
          )}
        </Button>
      </div>
    </form>
  );
}








