import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { SessionError } from "@repo/types/utils/errors";
import { userListSelect } from "./user.interface";
import type { Prisma } from "@repo/database";

export class UserModel extends PrismaDB {
  public async getByEmail(email: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.user.findUnique({
      select: userListSelect,
      where: {
        email,
      },
    });
  }

  public async listPaginated({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.user
      .paginate({
        select: userListSelect,
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }

  public async updateById(id: string, data: Prisma.UserUpdateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
