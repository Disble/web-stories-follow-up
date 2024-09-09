import type { ModelFactory } from "#factory/model-factory";

export abstract class PrismaDB {
  public constructor(
    protected readonly connect: ModelFactory["connect"],
    protected readonly db: ModelFactory
  ) {}
}
