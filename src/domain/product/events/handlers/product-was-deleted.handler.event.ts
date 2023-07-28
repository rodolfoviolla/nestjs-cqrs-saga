import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductWasDeletedEvent } from '../product-was-deleted.event';

@EventsHandler(ProductWasDeletedEvent)
export class ProductWasDeletedHandlerEvent implements IEventHandler<ProductWasDeletedEvent> {
    handle(event: ProductWasDeletedEvent) {
        Logger.log('ProductWasDeletedEvent called');
        return event;
    }
}
