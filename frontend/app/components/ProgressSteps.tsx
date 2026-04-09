import { Fragment } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type Step = 'upload' | 'jobDescription' | 'analyzing';

interface StepConfig {
  id: Step;
  label: string;
  completed: boolean;
}

interface ProgressStepsProps {
  steps: StepConfig[];
  currentStep: Step;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps): JSX.Element {
  return (
    <div className="mb-8">
      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep === step.id
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : step.completed
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : 'border-slate-300 bg-slate-100 text-slate-500'
                }`}
              >
                {step.completed ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium text-center ${
                  currentStep === step.id ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-4 transition-colors ${
                  step.completed ? 'bg-purple-500' : 'bg-slate-300'
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}



