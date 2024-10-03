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
}
