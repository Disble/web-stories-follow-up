import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { SessionError } from "@repo/types/utils/errors";
import { userListSelect } from "./user.interface";
import { Role, type Prisma } from "@repo/database";
import { auth } from "@repo/auth-config/auth";

export class UserModel extends PrismaDB {
  public async getByEmail(email: string) {
    const prisma = await this.connect.protected();
    const session = await auth();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    if (session?.user.role !== Role.SUPER_ADMIN) {
      return [
        new SessionError("Do not have permissions to access this section"),
        null,
      ] as const;
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
    const session = await auth();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    if (session?.user.role !== Role.SUPER_ADMIN) {
      return [
        new SessionError("Do not have permissions to access this section"),
        null,
      ] as const;
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
    const session = await auth();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    if (session?.user.role !== Role.SUPER_ADMIN) {
      throw new SessionError("Do not have permissions to perform this action");
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
