import { Module } from '@nestjs/common';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
import { AnalyzeAIService } from './ai.service';

@Module({
  controllers: [AnalyzeController],
  providers: [AnalyzeService, AnalyzeAIService],
  exports: [AnalyzeService],
})
export class AnalyzeModule {}

