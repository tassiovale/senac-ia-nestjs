import { Controller, Get } from '@nestjs/common';

@Controller('tempo')
export class TimeController {

  @Get()
  getDateAndTime(): string {
    return new Date().toLocaleString();
  }

  @Get('apenas_data')
  getDate(): string {
    return new Date().toLocaleDateString();
  }

  @Get('apenas_hora')
  getTime(): string {
    return new Date().toLocaleTimeString();
  }

}
