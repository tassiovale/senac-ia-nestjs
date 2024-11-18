import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Module({
    exports: [PaginationService],
    providers: [PaginationService]
})
export class SharedModule {}
