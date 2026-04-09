import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryResponseDto, HistoryItem } from './dto/history-response.dto';
import { AnalysisResult } from '../analyze/dto/analyze-response.dto';
import { Prisma } from '@prisma/client';

type UserSessionWithAnalyses = Prisma.UserSessionGetPayload<{
  include: {
    analyses: true;
  };
}>;

type AnalysisFromQuery = UserSessionWithAnalyses['analyses'][number];

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory(browserId: string): Promise<HistoryResponseDto> {
    const userSession = await this.prisma.userSession.findUnique({
      where: { browserId },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!userSession) {
      return { analyses: [] };
    }

    const typedSession = userSession as UserSessionWithAnalyses;
    const analyses: HistoryItem[] = typedSession.analyses.map((analysis: AnalysisFromQuery) => ({
      id: analysis.id,
      result: analysis.result as unknown as AnalysisResult,
      jobDescription: analysis.jobDescription,
      cvText: analysis.cvText,
      cvFilePath: analysis.cvFilePath || null,
      cvFileName: analysis.cvFileName || null,
      cvMimeType: analysis.cvMimeType || null,
      createdAt: analysis.createdAt.toISOString(),
    }));

    return { analyses };
  }
}

