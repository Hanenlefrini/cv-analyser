import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResponseDto } from './dto/history-response.dto';
import { z } from 'zod';

const BrowserIdQuerySchema = z.object({
  browserId: z.string().uuid(),
});

@Controller('analysis')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('history')
  async getHistory(@Query() query: unknown): Promise<HistoryResponseDto> {
    const { browserId } = BrowserIdQuerySchema.parse(query);
    return this.historyService.getHistory(browserId);
  }
}








