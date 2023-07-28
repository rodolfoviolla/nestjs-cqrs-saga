import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllCatalogQuery } from '../get-all-catalog.query';
import { CatalogStore } from '../../stores/catalog.store';

@QueryHandler(GetAllCatalogQuery)
export class GetAllCatalogHandlerQuery
  implements IQueryHandler<GetAllCatalogQuery> {
  public constructor(
    private readonly catalogStore: CatalogStore,
  ) {}

  public async execute() {
    return await this.catalogStore.getAllCatalog();
  }
}
