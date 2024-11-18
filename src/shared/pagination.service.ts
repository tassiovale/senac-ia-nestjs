import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {
  async paginate<Entity>(
    repository: Repository<Entity>,
    paginationDto: PaginationDto,
    queryBuilder: (qb: SelectQueryBuilder<Entity>) => void = (qb) => {} 
  ): Promise<{
    items: Entity[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    // Construir a consulta
    const qb = repository.createQueryBuilder();

    // Executar a query customizada, se fornecida
    queryBuilder(qb);

    // Executando a consulta paginada
    const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

    // Calcular o total de páginas
    const totalPages = Math.ceil(total / limit);

    // Verificar se existe próxima página
    const hasNextPage = page < totalPages;

    // Verificar se existe página anterior
    const hasPreviousPage = page > 1;

    return {
      items,
      total,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
