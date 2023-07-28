import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { UpdateProductFromCatalogCommand } from '../update-product-from-catalog.command';
import { CatalogStore } from '../../stores/catalog.store';
import { Catalog } from '../../entities/catalog.entity';

@CommandHandler(UpdateProductFromCatalogCommand)
export class UpdateProductFromCatalogHandler implements ICommandHandler<UpdateProductFromCatalogCommand> {
    public constructor(private readonly catalogStore: CatalogStore) {}

    public async execute(command: UpdateProductFromCatalogCommand): Promise<Catalog | Error> {
        Logger.log('update product from catalog domain called');
        const { sku, name, price, currency } = command;
        const catalogEntity = await this.catalogStore.getCatalogBySku(sku);
        catalogEntity.name = name;
        catalogEntity.price = price;
        catalogEntity.currency = currency;
        const catalog = await this.catalogStore.register(catalogEntity, sku);
        return catalog;
    }
}
