import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { SessionError } from "@repo/types/utils/errors";

export class UserModel extends PrismaDB {
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

  public async getUsers({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.user
      .paginate({
        select: {
          id: true,
          name: true,
        },
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }

  public async getUsersPublic() {
    const prisma = await this.connect.public();
    return prisma.user
      .paginate({
        select: {
          id: true,
          name: true,
        },
      })
      .withPages({
        page: 1,
        limit: 10,
        includePageCount: true,
      });
  }
}
