export class RemoveProductFromCatalogCommand {
  public constructor(
    public readonly sku: string,
  ) {}
}
