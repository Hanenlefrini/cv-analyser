import { Injectable } from '@nestjs/common';
import { analyzeCV } from '../ai';
import { AnalysisResult } from './dto/analyze-response.dto';

@Injectable()
export class AnalyzeAIService {
  async analyzeCV(cvText: string, jobDescription: string): Promise<AnalysisResult> {
    const result = await analyzeCV(cvText, jobDescription);
    return this.validateAndNormalizeResult(result);
  }

  private validateAndNormalizeResult(parsed: unknown): AnalysisResult {
    const result = parsed as Record<string, unknown>;
    const scores = result.scores as Record<string, unknown> | undefined;

    return {
      scores: {
        experience: this.normalizeScore(scores?.experience),
        skills: this.normalizeScore(scores?.skills),
        education: this.normalizeScore(scores?.education),
      },
      missingRequirements: Array.isArray(result.missingRequirements)
        ? result.missingRequirements.map(String)
        : [],
      strengths: Array.isArray(result.strengths) ? result.strengths.map(String) : [],
      concerns: Array.isArray(result.concerns) ? result.concerns.map(String) : [],
      summary: String(result.summary || ''),
    };
  }

  private normalizeScore(value: unknown): number {
    const num = Number(value);
    if (isNaN(num)) {
      return 0;
    }
    return Math.max(0, Math.min(100, Math.round(num)));
  }
}

