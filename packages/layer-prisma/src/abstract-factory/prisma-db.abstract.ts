import type { ModelFactory } from "#factory/model-factory";

export abstract class PrismaDB {
  public constructor(
    protected readonly connect: ModelFactory["connect"],
    // TODO: TOCA PROBAR SI FUNCIONA
    protected readonly db: ModelFactory
  ) {}
}
