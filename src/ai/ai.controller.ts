import { Controller,  Post, Body, Res } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('games')
  async recommendGame(@Body() createAiDto: CreateAiDto) {
    return await this.aiService.recommendGames(createAiDto);
  }
}
