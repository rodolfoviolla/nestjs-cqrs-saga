import { ProductWasAddedHandlerEvent } from "./product-was-added.handler.event";
import { ProductWasDeletedHandlerEvent } from "./product-was-deleted.handler.event";
import { ProductWasUpdatedHandlerEvent } from "./product-was-updated.handler.event";

export const EventHandlers = [ProductWasAddedHandlerEvent, ProductWasDeletedHandlerEvent, ProductWasUpdatedHandlerEvent];
