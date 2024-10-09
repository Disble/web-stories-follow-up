import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import { parameterListSelect } from "./parameter.interface";

export class ParameterModel extends PrismaDB {
  public async getByName(name: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.parameter.findUnique({
      select: parameterListSelect,
      where: {
        name,
      },
    });
  }

  public async create(data: Prisma.ParameterCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.parameter.create({
      data,
    });
  }

  public async updateById(id: string, data: Prisma.ParameterUpdateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.parameter.update({
      where: { id },
      data,
    });
  }

  public async updateByName(name: string, data: Prisma.ParameterUpdateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.parameter.update({
      where: { name },
      data,
    });
  }

  public async delete(id: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.parameter.delete({
      where: { id },
    });
  }

  public async listPaginated({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.parameter
      .paginate({
        select: parameterListSelect,
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }
}
