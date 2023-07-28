import { Controller, Get } from '@nestjs/common';

import { CatalogService } from '../services/catalog.service';
import { Catalog } from '../entities/catalog.entity';

@Controller('catalog')
export class CatalogController {
  public constructor(private readonly catalogService: CatalogService) {}

  @Get()
  public get(): Promise<Catalog[] | Error> {
    return this.catalogService.getAll();
  }
}
