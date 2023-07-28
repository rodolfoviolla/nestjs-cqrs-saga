import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { RemoveProductCommand } from '../remove-product.command';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../entities/product.entity';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler
  implements ICommandHandler<RemoveProductCommand> {
  
  public constructor(
    private readonly productStore: ProductStore,
    private readonly publisher: EventPublisher,
  ) {}
  
    async execute(command: RemoveProductCommand): Promise<Product | Error> {
    try {
        const { sku } = command;
        const product =  await this.productStore.removeProduct(sku);

        if (product instanceof Error) {
          throw product;
        }

        const productAggregate = this.publisher.mergeObjectContext(new ProductAggregate());
        productAggregate.deleteProduct(sku);
        productAggregate.commit();

        return product;
    } catch (e) {
      Logger.error(e, 'RemoveProductHandler.execute() Error Handler: ');
      return e;
    }
  }
}
