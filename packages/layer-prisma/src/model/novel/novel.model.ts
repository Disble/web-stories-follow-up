import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";

export class NovelModel extends PrismaDB {
  public async create(data: Prisma.NovelCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novel.create({
      data,
    });
  }
}
