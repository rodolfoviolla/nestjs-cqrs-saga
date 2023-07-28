import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../../databases/database.module';
import { CatalogStore } from './stores/catalog.store';
import { CatalogProvider } from './providers/catalog.provider';
import { CatalogService } from './services/catalog.service';
import { GetAllCatalogHandlerQuery } from './queries/handlers/get-all-catalog.handler.query';
import { CatalogController } from './controllers/catalog.controller';
import { CommandHandlers } from './commands/handlers';

@Module({
    imports: [
        CqrsModule,
        DatabaseModule,
    ],
    controllers: [CatalogController],
    providers: [
        ...CommandHandlers,
        CatalogStore,
        CatalogService,
        GetAllCatalogHandlerQuery,
        ...CatalogProvider,
    ],
})
export class CatalogModule {}
