import { AggregateRoot } from '@nestjs/cqrs';

import { ProductWasAddedEvent } from '../events/product-was-added.event';
import { ProductWasDeletedEvent } from '../events/product-was-deleted.event';
import { ProductWasUpdatedEvent } from '../events/product-was-updated.event';

export class ProductAggregate extends AggregateRoot {
  public registerProduct(sku: string, name: string, price: number, currency: string) {
    this.apply(new ProductWasAddedEvent(name, sku, price, currency));
  }

  public updateProduct(sku: string, name: string, price: number, currency: string) {
    this.apply(new ProductWasUpdatedEvent(name, sku, price, currency));
  }

  public deleteProduct(sku: string) {
    this.apply(new ProductWasDeletedEvent(sku));
  }
}
