import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AnalysisResult } from './api';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function calculateAverageScore(result: AnalysisResult): number {
  return Math.round(
    (result.scores.experience + result.scores.skills + result.scores.education) / 3
  );
}

export function isValidPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}
