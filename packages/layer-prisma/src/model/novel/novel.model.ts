import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { NovelStatus, type Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import {
  novelCardListSelect,
  novelFindBySlugSelect,
  novelListSelect,
} from "./novel.interface";

export class NovelModel extends PrismaDB {
  public async create(data: Prisma.NovelPlatformCreateArgs["data"]) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novelPlatform.create({
      data,
    });
  }

  public async findBySlugAndPlatform(slug: string, platformCode: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novelPlatform.findFirst({
      where: {
        AND: [
          {
            novel: { slug },
          },
          { platform: { code: platformCode } },
        ],
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

  public async findByUrlNovel(urlNovel: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.novelPlatform.findFirst({
      select: {
        novel: {
          select: {
            slug: true,
          },
        },
      },
      where: {
        urlNovel,
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
          createdAt: "desc",
        },
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }

  public async listActivePreferents() {
    const prisma = await this.connect.public();

    return prisma.novel.findMany({
      where: {
        status: NovelStatus.ONGOING,
        novelPlatforms: {
          some: {
            isPreferred: true,
          },
        },
      },
      select: novelListSelect,
    });
  }
}
