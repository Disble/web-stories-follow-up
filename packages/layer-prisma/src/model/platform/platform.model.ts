import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import {
  platformListSelect,
  platformGetByNameSelect,
} from "./platform.interface";

export class PlatformModel extends PrismaDB {
  public async create(data: Prisma.PlatformCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
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

  public async listPaginated({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
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
