import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Catalog } from '../entities/catalog.entity';
import { GetAllCatalogQuery} from '../queries/get-all-catalog.query';

@Injectable()
export class CatalogService {
  public constructor(
    private queryBus: QueryBus,
  ) {}

  public async getAll(): Promise<Catalog[]> {
    return this.queryBus.execute(new GetAllCatalogQuery());
  }
}
