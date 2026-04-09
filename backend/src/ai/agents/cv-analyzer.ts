import OpenAI from 'openai';
import type { AnalysisResult } from '../../analyze/dto/analyze-response.dto';
import { OPENAI_API_KEY } from '../../config/env';

const PROMPT_TEMPLATE = `You are a CV analyzer. Analyze CVs against job descriptions and return structured JSON only.

Return format must match this exact schema:
{
  "scores": {
    "experience": number (0-100),
    "skills": number (0-100),
    "education": number (0-100)
  },
  "missingRequirements": string[],
  "strengths": string[],
  "concerns": string[],
  "summary": string
}

No markdown, no explanations, no additional text. Only valid JSON.

Analyze this CV against the job description.

CV:
{{cvText}}

Job Description:
{{jobDescription}}`;

function buildPrompt(cvText: string, jobDescription: string): string {
  return PROMPT_TEMPLATE.replace('{{cvText}}', cvText).replace('{{jobDescription}}', jobDescription);
}

export async function analyzeCV(
  cvText: string,
  jobDescription: string,
): Promise<AnalysisResult> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const prompt = buildPrompt(cvText, jobDescription);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a CV analyzer. Return only valid JSON, no markdown, no explanations.',
      },
      {
        role: 'user',
        content: `${prompt}\n\nReturn ONLY valid JSON matching this schema:
{
  "scores": {
    "experience": number (0-100),
    "skills": number (0-100),
    "education": number (0-100)
  },
  "missingRequirements": string[],
  "strengths": string[],
  "concerns": string[],
  "summary": string
}`,
      },
    ],
    temperature: 0,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const parsed = JSON.parse(content);
  return parsed as AnalysisResult;
}
