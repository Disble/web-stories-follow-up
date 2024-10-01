import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import { templateListSelect } from "./template.interface";

export class TemplateModel extends PrismaDB {
  public async getById(id: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.template.findUnique({
      where: { id },
      select: templateListSelect,
    });
  }

  public async create(data: Prisma.TemplateCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.template.create({
      data,
      select: templateListSelect,
    });
  }

  public async update(id: string, data: Prisma.TemplateUpdateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.template.update({
      where: { id },
      data,
    });
  }

  public async upsert(data: Prisma.TemplateUpsertArgs) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.template.upsert(data);
  }

  public async delete(id: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.template.delete({
      where: { id },
    });
  }

  public async listPaginated({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.template
      .paginate({
        select: templateListSelect,
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }
}
