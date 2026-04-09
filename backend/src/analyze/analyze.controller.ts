import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeResponseDto } from './dto/analyze-response.dto';
import { AnalyzeRequestSchema } from './dto/analyze-request.dto';

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Post()
  async analyze(
    @Body() body: unknown,
    @Headers('x-browser-id') browserId: string | undefined,
  ): Promise<AnalyzeResponseDto> {
    if (!browserId) {
      throw new BadRequestException('Browser ID is required in headers');
    }

    const request = AnalyzeRequestSchema.parse(body);
    return this.analyzeService.analyze(browserId, request);
  }

  @Get(':id')
  async getAnalysis(@Param('id', ParseUUIDPipe) id: string): Promise<AnalyzeResponseDto> {
    return this.analyzeService.getAnalysisById(id);
  }
}

