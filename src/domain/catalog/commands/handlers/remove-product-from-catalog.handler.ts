import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RemoveProductFromCatalogCommand } from '../remove-product-from-catalog.command';
import { CatalogStore } from '../../stores/catalog.store';
import { Catalog } from '../../entities/catalog.entity';

@CommandHandler(RemoveProductFromCatalogCommand)
export class RemoveProductFromCatalogHandler implements ICommandHandler<RemoveProductFromCatalogCommand> {
    public constructor(private readonly catalogStore: CatalogStore) {}

    public async execute(command: RemoveProductFromCatalogCommand): Promise<Catalog | Error> {
        Logger.log('delete product to catalog domain called');
        const catalog = await this.catalogStore.removeCatalog(command.sku);
        return catalog;
    }
}