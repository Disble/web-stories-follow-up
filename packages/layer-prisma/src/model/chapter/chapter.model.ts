import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";

const TRANSACTION_TIMEOUT = 40 * 1000;

export class ChapterModel extends PrismaDB {
  public async createMany(chapters: Prisma.ChapterCreateManyInput[]) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.chapter.createMany({
      data: chapters,
      skipDuplicates: true,
    });
  }

  public async deleteMany(chaptersIds: Array<string>) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.chapter.deleteMany({
      where: {
        id: { in: chaptersIds },
      },
    });
  }

  public async updateMany(
    chapters: Array<Prisma.ChapterUpdateInput & { id: string }>
  ) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.$transaction(
      async (tx) => {
        for (const chapter of chapters) {
          const { id, ...data } = chapter;
          await tx.chapter.update({
            where: {
              id,
            },
            data,
          });
        }
      },
      {
        timeout: TRANSACTION_TIMEOUT,
      }
    );
  }

  public async findLastChapterEnabledToPublish(novelId: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma; // NOTE: exclusive used in cron
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        novelId,
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastChapter) {
      throw new Error("Error finding last chapter in range 1 hour");
    }

    return lastChapter;
  }
}
