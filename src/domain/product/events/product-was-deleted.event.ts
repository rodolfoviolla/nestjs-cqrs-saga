import { Logger } from '@nestjs/common';

export class ProductWasDeletedEvent {
  public constructor(
    public readonly sku: string,
  ) {
    Logger.log('ProductWasDeletedEvent called');
  }
}