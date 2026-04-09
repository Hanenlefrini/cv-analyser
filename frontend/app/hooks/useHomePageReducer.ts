import { useReducer } from 'react';

type Step = 'upload' | 'jobDescription' | 'analyzing';

interface HomePageState {
  currentStep: Step;
  isUploading: boolean;
  uploadedFileName: string;
  cvText: string;
  selectedJobSample: string | null;
  jobDescriptionCompleted: boolean;
}

type HomePageAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'START_UPLOAD'; payload: string }
  | { type: 'UPLOAD_SUCCESS'; payload: string }
  | { type: 'UPLOAD_FAILED' }
  | { type: 'SET_JOB_SAMPLE'; payload: string | null }
  | { type: 'SET_JOB_DESCRIPTION_COMPLETED' }
  | { type: 'RESET' };

const initialState: HomePageState = {
  currentStep: 'upload',
  isUploading: false,
  uploadedFileName: '',
  cvText: '',
  selectedJobSample: null,
  jobDescriptionCompleted: false,
};

function homePageReducer(
  state: HomePageState,
  action: HomePageAction,
): HomePageState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'START_UPLOAD':
      return {
        ...state,
        isUploading: true,
        uploadedFileName: action.payload,
      };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        isUploading: false,
        cvText: action.payload,
        currentStep: 'jobDescription',
      };
    case 'UPLOAD_FAILED':
      return {
        ...state,
        isUploading: false,
        uploadedFileName: '',
      };
    case 'SET_JOB_SAMPLE':
      return { ...state, selectedJobSample: action.payload };
    case 'SET_JOB_DESCRIPTION_COMPLETED':
      return {
        ...state,
        jobDescriptionCompleted: true,
        currentStep: 'analyzing',
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useHomePageReducer(): [HomePageState, React.Dispatch<HomePageAction>] {
  return useReducer(homePageReducer, initialState);
}

export type { HomePageState, HomePageAction, Step };








