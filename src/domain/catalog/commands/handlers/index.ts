import { AddProductToCatalogHandler } from "./add-product-to-catalog.handler";
import { RemoveProductFromCatalogHandler } from "./remove-product-from-catalog.handler";
import { UpdateProductFromCatalogHandler } from "./update-product-from-catalog.handler";

export const CommandHandlers = [AddProductToCatalogHandler, RemoveProductFromCatalogHandler, UpdateProductFromCatalogHandler];
export { AddProductToCatalogHandler, RemoveProductFromCatalogHandler, UpdateProductFromCatalogHandler }
