import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AddProductToCatalogCommand } from '../add-product-to-catalog.command';
import { CatalogStore } from '../../stores/catalog.store';
import { Catalog } from '../../entities/catalog.entity';

@CommandHandler(AddProductToCatalogCommand)
export class AddProductToCatalogHandler implements ICommandHandler<AddProductToCatalogCommand> {
    public constructor(private readonly catalogStore: CatalogStore) {}

    public async execute(command: AddProductToCatalogCommand): Promise<Catalog | Error> {
        Logger.log('add product to catalog domain called');
        const { sku, name, price, currency } = command;
        const catalogEntity = new Catalog();
        catalogEntity.sku = sku;
        catalogEntity.name = name;
        catalogEntity.price = price;
        catalogEntity.currency = currency;
        const catalog = await this.catalogStore.register(catalogEntity);
        return catalog;
    }
}
