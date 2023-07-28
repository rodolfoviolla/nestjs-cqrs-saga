import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductWasUpdatedEvent } from '../product-was-updated.event';

@EventsHandler(ProductWasUpdatedEvent)
export class ProductWasUpdatedHandlerEvent implements IEventHandler<ProductWasUpdatedEvent> {
    handle(event: ProductWasUpdatedEvent) {
        Logger.log('ProductWasUpdatedHandlerEvent called');
        return event;
    }
}
