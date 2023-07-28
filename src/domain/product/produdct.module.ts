import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { CommandHandlers } from './commands/handlers';
import { QueriesHandlers } from './queries/handlers';
import { ProductStore } from './stores/product.store';
import { DatabaseModule } from '../../databases/database.module';
import { ProductProvider } from './providers/product.provider';
import { ProductSaga } from './sagas/product.saga';
import { EventHandlers } from './events/handlers';

@Module({
  controllers: [ProductController],
  imports: [
    CqrsModule,
    DatabaseModule,
  ],
  providers: [
    ...CommandHandlers,
    ProductService,
    ...ProductProvider,
    ProductStore,
    ...QueriesHandlers,
    ProductSaga,
    ...EventHandlers,
  ],
})
export class ProductModule {}
