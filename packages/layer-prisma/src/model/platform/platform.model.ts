import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import { Role, type Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import {
  platformListSelect,
  platformGetByNameSelect,
} from "./platform.interface";
import { auth } from "@repo/auth-config/auth";

export class PlatformModel extends PrismaDB {
  public async create(data: Prisma.PlatformCreateInput) {
    const prisma = await this.connect.protected();
    const session = await auth();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    if (session?.user.role !== Role.SUPER_ADMIN) {
      throw new SessionError("Do not have permissions to perform this action");
    }

    return prisma.platform.create({
      data,
    });
  }

  public async getPlatformByCode(code: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.platform.findUnique({
      where: { code },
      select: platformGetByNameSelect,
    });
  }

  public async list() {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.platform.findMany({
      select: platformListSelect,
    });
  }

  public async listBySlug(slug: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.platform.findMany({
      where: {
        novelPlatforms: {
          some: {
            novel: {
              slug,
            },
          },
        },
      },
    });
  }

  public async listPaginated({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) {
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

    return prisma.platform
      .paginate({
        select: platformListSelect,
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
