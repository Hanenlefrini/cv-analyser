import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from './env';

export interface UploadResponse {
  cvText: string;
}

export interface AnalyzeRequest {
  jobDescription: string;
}

export interface AnalysisResult {
  scores: {
    experience: number;
    skills: number;
    education: number;
  };
  missingRequirements: string[];
  strengths: string[];
  concerns: string[];
  summary: string;
}

export interface AnalyzeResponse {
  id: string;
  result: AnalysisResult;
  jobDescription: string;
  cvText: string;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  result: AnalysisResult;
  jobDescription: string;
  cvText: string;
  cvFilePath: string | null;
  cvFileName: string | null;
  cvMimeType: string | null;
  createdAt: string;
}

export interface HistoryResponse {
  analyses: HistoryItem[];
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function uploadCV(file: File, browserId: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post<UploadResponse>('/upload', formData, {
      headers: {
        'x-browser-id': browserId,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message || 'Failed to upload CV';
      throw new Error(message);
    }
    throw new Error('Failed to upload CV');
  }
}

export async function analyzeCV(
  request: AnalyzeRequest,
  browserId: string,
): Promise<AnalyzeResponse> {
  try {
    const response = await apiClient.post<AnalyzeResponse>('/analyze', request, {
      headers: {
        'x-browser-id': browserId,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message || 'Failed to analyze CV';
      throw new Error(message);
    }
    throw new Error('Failed to analyze CV');
  }
}

export async function getAnalysisById(id: string): Promise<AnalyzeResponse> {
  try {
    const response = await apiClient.get<AnalyzeResponse>(`/analyze/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message || 'Failed to fetch analysis';
      throw new Error(message);
    }
    throw new Error('Failed to fetch analysis');
  }
}

export async function getHistory(browserId: string): Promise<HistoryResponse> {
  try {
    const response = await apiClient.get<HistoryResponse>('/analysis/history', {
      params: {
        browserId,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message || 'Failed to fetch history';
      throw new Error(message);
    }
    throw new Error('Failed to fetch history');
  }
}

