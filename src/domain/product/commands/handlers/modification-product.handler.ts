import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ModificationProductCommand } from '../modification-product.command';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../entities/product.entity';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(ModificationProductCommand)
export class ModificationProductHandler
  implements ICommandHandler<ModificationProductCommand> {
  public constructor(
    private readonly productStore: ProductStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: ModificationProductCommand): Promise<Product | Error> {
    try {
      const { sku, name, price, currency } = command;
      const productEntity = new Product();
      productEntity.sku = sku;
      productEntity.name = name;
      productEntity.price = price;
      productEntity.currency = currency;

      const product = this.productStore.register(productEntity, sku);
      if (product instanceof Error) {
        throw product;
      }

      const productAggregate = this.publisher.mergeObjectContext(new ProductAggregate());
      productAggregate.updateProduct(sku, name, price, currency);
      productAggregate.commit();

      return product;
    } catch (e) {
      return new Error(e);
    }
  }
}
