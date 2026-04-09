'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useHistory } from '@/hooks/useHistory';
import { useUploadMutation } from '@/hooks/mutations/useUploadMutation';
import { useAnalyzeMutation } from '@/hooks/mutations/useAnalyzeMutation';
import { isValidPDFFile } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressSteps } from './components/ProgressSteps';
import { UploadStep } from './components/UploadStep';
import { JobDescriptionStep } from './components/JobDescriptionStep';
import { AnalyzingStep } from './components/AnalyzingStep';
import { useHomePageReducer, type Step } from './hooks/useHomePageReducer';

export default function HomePage(): JSX.Element {
  const router = useRouter();
  const { browserId, setError, analyses } = useStore();
  const [state, dispatch] = useHomePageReducer();
  const uploadMutation = useUploadMutation();
  const analyzeMutation = useAnalyzeMutation();

  useHistory();

  const handleFileUpload = async (file: File): Promise<void> => {
    if (!browserId) {
      setError('Browser ID not initialized');
      return;
    }

    if (!isValidPDFFile(file)) {
      setError('Only PDF files are allowed');
      return;
    }

    dispatch({ type: 'START_UPLOAD', payload: file.name });
    setError(null);

    try {
      const response = await uploadMutation.mutateAsync({ file, browserId });
      dispatch({ type: 'UPLOAD_SUCCESS', payload: response.cvText });
    } catch {
      dispatch({ type: 'UPLOAD_FAILED' });
    }
  };

  const handleJobDescriptionSubmit = async (data: { jobDescription: string }): Promise<void> => {
    if (!browserId) {
      setError('Browser ID not initialized');
      return;
    }

    dispatch({ type: 'SET_JOB_DESCRIPTION_COMPLETED' });
    setError(null);

    try {
      const response = await analyzeMutation.mutateAsync({
        request: { jobDescription: data.jobDescription },
        browserId,
      });
      router.push(`/results/${response.id}`);
    } catch {
      dispatch({ type: 'SET_STEP', payload: 'jobDescription' });
    }
  };

  const handleBack = (): void => {
    dispatch({ type: 'SET_STEP', payload: 'upload' });
  };

  const handleJobSampleSelect = (title: string, _description: string): void => {
    dispatch({ type: 'SET_JOB_SAMPLE', payload: title });
  };

  const steps = [
    { id: 'upload' as Step, label: 'Upload CV', completed: !!state.cvText },
    { id: 'jobDescription' as Step, label: 'Job Description', completed: state.jobDescriptionCompleted },
    { id: 'analyzing' as Step, label: 'Analyzing', completed: false },
  ];

  const stepTitles: Record<Step, string> = {
    upload: 'Step 1: Upload Your CV',
    jobDescription: 'Step 2: Enter Job Description',
    analyzing: 'Step 3: Analyzing Your CV',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-animated-gradient"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
      <div className="relative z-10 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">CV Analyzer</h1>
            <p className="text-slate-600 text-lg">
              Upload your CV and analyze how well you match job requirements
            </p>
          </div>

          <ProgressSteps steps={steps} currentStep={state.currentStep} />

          <Card className="backdrop-blur-xl bg-white/80 border-slate-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-slate-900">
                {stepTitles[state.currentStep]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.currentStep === 'upload' && (
                <UploadStep
                  isUploading={state.isUploading || uploadMutation.isPending}
                  uploadedFileName={state.uploadedFileName}
                  onFileSelect={handleFileUpload}
                  onFileError={setError}
                  analyses={analyses}
                />
              )}

              {state.currentStep === 'jobDescription' && (
                <JobDescriptionStep
                  onSubmit={handleJobDescriptionSubmit}
                  onBack={handleBack}
                  selectedJobSample={state.selectedJobSample}
                  onJobSampleSelect={handleJobSampleSelect}
                  isSubmitting={analyzeMutation.isPending}
                />
              )}

              {state.currentStep === 'analyzing' && <AnalyzingStep />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
