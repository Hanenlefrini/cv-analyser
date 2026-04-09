'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { AnalyzeResponse, HistoryItem } from './api';

interface AppState {
  browserId: string;
  currentAnalysis: AnalyzeResponse | null;
  analyses: HistoryItem[];
  loading: boolean;
  error: string | null;
  setBrowserId: (id: string) => void;
  setCurrentAnalysis: (analysis: AnalyzeResponse | null) => void;
  setAnalyses: (analyses: HistoryItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeBrowserId: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      browserId: '',
      currentAnalysis: null,
      analyses: [],
      loading: false,
      error: null,
      setBrowserId: (id: string): void => {
        set({ browserId: id });
      },
      setCurrentAnalysis: (analysis: AnalyzeResponse | null): void => {
        set({ currentAnalysis: analysis });
      },
      setAnalyses: (analyses: HistoryItem[]): void => {
        set({ analyses });
      },
      setLoading: (loading: boolean): void => {
        set({ loading });
      },
      setError: (error: string | null): void => {
        set({ error });
      },
      initializeBrowserId: (): void => {
        set((state) => {
          if (!state.browserId) {
            const newId = uuidv4();
            return { browserId: newId };
          }
          return state;
        });
      },
    }),
    {
      name: 'cv-analyzer-storage',
      partialize: (state) => ({
        browserId: state.browserId,
        analyses: state.analyses,
      }),
    },
  ),
);

