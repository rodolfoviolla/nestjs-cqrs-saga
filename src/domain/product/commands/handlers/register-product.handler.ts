import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher  } from '@nestjs/cqrs';

import { RegisterProductCommand } from '../register-product.command';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../entities/product.entity';
import { ProductAggregate } from '../../aggregates/product.aggregate';

@CommandHandler(RegisterProductCommand)
export class RegisterProductHandler implements ICommandHandler<RegisterProductCommand> {
  public constructor(
    private readonly productStore: ProductStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: RegisterProductCommand): Promise<Product | Error> {
    try {
      const { name, sku, price, currency } = command;
      const productEntity = new Product();
      productEntity.name = name;
      productEntity.sku = sku;
      productEntity.price = price;
      productEntity.currency = currency;
      const product = await this.productStore.register(productEntity);

      if (product instanceof Error) {
        throw product;
      }

      const productAggregate = this.publisher.mergeObjectContext(new ProductAggregate());
      productAggregate.registerProduct(sku, name, price, currency);
      productAggregate.commit();

      return product;
    } catch (e) {
      Logger.error(e, 'RegisterProductHandler.execute() Error Handler: ');
      return e;
    }
  }
}
