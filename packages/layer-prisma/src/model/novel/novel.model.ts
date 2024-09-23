import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import { novelCardListSelect } from "./novel.interface";

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

  public async cardsList({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.novel
      .paginate({
        select: novelCardListSelect,
        orderBy: {
          updatedAt: "desc",
        },
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }
}
