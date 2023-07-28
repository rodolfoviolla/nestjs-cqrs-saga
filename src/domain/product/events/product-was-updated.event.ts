import { Logger } from '@nestjs/common';

export class ProductWasUpdatedEvent {
  public constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly price: number,
    public readonly currency: string,
  ) {
    Logger.log('ProductWasUpdatedEvent called');
  }
}
