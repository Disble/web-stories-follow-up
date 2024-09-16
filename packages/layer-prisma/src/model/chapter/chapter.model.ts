import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { SessionError } from "@repo/types/utils/errors";

export class ChapterModel extends PrismaDB {
  public async getUserByEmail(email: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
