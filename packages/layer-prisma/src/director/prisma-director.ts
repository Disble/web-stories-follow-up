import { PrismaBuilder } from "#builder/prisma-builder";

export abstract class PrismaDirector {
  public constructor(
    protected readonly prisma: ReturnType<typeof PrismaBuilder.getClient>,
    protected baseURL: string
  ) {}
}
