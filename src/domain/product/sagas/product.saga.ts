
import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { AddProductToCatalogCommand } from '../../catalog/commands/add-product-to-catalog.command';
import { RemoveProductFromCatalogCommand } from '../../catalog/commands/remove-product-from-catalog.command';
import { UpdateProductFromCatalogCommand } from '../../catalog/commands/update-product-from-catalog.command';
import { ProductWasAddedEvent } from '../events/product-was-added.event';
import { ProductWasDeletedEvent } from '../events/product-was-deleted.event';
import { ProductWasUpdatedEvent } from '../events/product-was-updated.event';

@Injectable()
export class ProductSaga {
  @Saga()
  productWasAdded = (events$: Observable<any>): Observable<ICommand> => {
    return events$
        .pipe(
          ofType(ProductWasAddedEvent),
          delay(1000),
          map(event => {
            Logger.log('saga call AddProductToCatalogCommand');
            return new AddProductToCatalogCommand(event.name, event.sku, event.price, event.currency);
          }),
        );
  }

  @Saga()
  productWasUpdated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
        .pipe(
          ofType(ProductWasUpdatedEvent),
          delay(1000),
          map(event => {
            Logger.log('saga call UpdateProductFromCatalogCommand');
            return new UpdateProductFromCatalogCommand(event.name, event.sku, event.price, event.currency);
          }),
        );
  }
  
  @Saga()
  productWasDeleted = (events$: Observable<any>): Observable<ICommand> => {
    return events$
        .pipe(
          ofType(ProductWasDeletedEvent),
          delay(1000),
          map(event => {
            Logger.log('saga call RemoveProductFromCatalogCommand');
            return new RemoveProductFromCatalogCommand(event.sku);
          }),
        );
  }
}
