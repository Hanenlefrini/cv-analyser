import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeAIService } from './ai.service';
import { AnalyzeRequestDto } from './dto/analyze-request.dto';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';
import { AnalysisResult } from './dto/analyze-response.dto';

@Injectable()
export class AnalyzeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AnalyzeAIService,
  ) {}

  async analyze(browserId: string, request: AnalyzeRequestDto): Promise<AnalyzeResponseDto> {
    const userSession = await this.prisma.userSession.findUnique({
      where: { browserId },
    });

    if (!userSession) {
      throw new BadRequestException('No CV uploaded. Please upload a CV first.');
    }

    if (!userSession.cvText) {
      throw new BadRequestException('No CV text found. Please upload a CV first.');
    }

    if (!userSession.cvFilePath) {
      throw new BadRequestException('CV file path not found. Please upload a CV first.');
    }

    const result: AnalysisResult = await this.aiService.analyzeCV(
      userSession.cvText,
      request.jobDescription,
    );

    const analysis = await this.prisma.analysis.create({
      data: {
        userSessionId: userSession.id,
        cvText: userSession.cvText,
        cvFilePath: userSession.cvFilePath,
        cvFileName: userSession.cvFileName || null,
        cvMimeType: userSession.cvMimeType || null,
        jobDescription: request.jobDescription,
        result: result as unknown as Prisma.InputJsonValue,
      },
    });

    const response: AnalyzeResponseDto = {
      id: analysis.id,
      result,
      jobDescription: analysis.jobDescription || '',
      cvText: analysis.cvText || '',
      cvFilePath: analysis.cvFilePath || null,
      cvFileName: analysis.cvFileName || null,
      cvMimeType: analysis.cvMimeType || null,
      createdAt: analysis.createdAt.toISOString(),
    };
    
    return response;
  }

  async getAnalysisById(id: string): Promise<AnalyzeResponseDto> {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
    });

    if (!analysis) {
      throw new NotFoundException('Analysis not found');
    }
    
    const analysisRecord = analysis as Record<string, unknown>;
    const jobDescription = (analysisRecord.jobDescription as string | null | undefined) ?? '';
    const cvText = (analysisRecord.cvText as string | null | undefined) ?? '';
    const cvFilePath = (analysisRecord.cvFilePath as string | null | undefined) ?? null;
    const cvFileName = (analysisRecord.cvFileName as string | null | undefined) ?? null;
    const cvMimeType = (analysisRecord.cvMimeType as string | null | undefined) ?? null;

    const response: AnalyzeResponseDto = {
      id: analysis.id,
      result: analysis.result as unknown as AnalysisResult,
      jobDescription: String(jobDescription || ''),
      cvText: String(cvText || ''),
      cvFilePath: cvFilePath ? String(cvFilePath) : null,
      cvFileName: cvFileName ? String(cvFileName) : null,
      cvMimeType: cvMimeType ? String(cvMimeType) : null,
      createdAt: analysis.createdAt.toISOString(),
    };
    
    return response;
  }
}

