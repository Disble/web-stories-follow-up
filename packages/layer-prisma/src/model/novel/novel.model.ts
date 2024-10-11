import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import {
  novelCardListSelect,
  novelFindBySlugSelect,
  novelListSelect,
} from "./novel.interface";

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

  public async findBySlug(slug: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novel.findUnique({
      where: {
        slug,
      },
      select: novelFindBySlugSelect,
    });
  }

  public async countBySlug(slug: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novel.count({
      where: {
        slug,
      },
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

  public async list() {
    const prisma = await this.connect.public();

    return prisma.novel.findMany({
      select: novelListSelect,
    });
  }
}
