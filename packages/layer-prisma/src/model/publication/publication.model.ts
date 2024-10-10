import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import { publicationListSelect } from "./publication.interface";

export class PublicationModel extends PrismaDB {
  public async create(data: Prisma.PublicationCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.publication.create({
      data,
    });
  }

  public async listPaginated({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.publication
      .paginate({
        select: publicationListSelect,
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }
}
