import { Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';

@Injectable()
export class AiService {
  recommend(createAiDto: CreateAiDto) {
    return 'This action adds a new ai';
  }
}
