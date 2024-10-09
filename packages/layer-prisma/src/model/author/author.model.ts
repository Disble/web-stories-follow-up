import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import { authorListSelect } from "./author.interface";

export class AuthorModel extends PrismaDB {
  public async getByName(name: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.author.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  public async getByPseudonym(pseudonym: string) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.author.findFirst({
      where: {
        pseudonym: {
          equals: pseudonym,
          mode: "insensitive",
        },
      },
    });
  }

  public async create(data: Prisma.AuthorCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    return prisma.author.create({
      data,
    });
  }

  public async listPaginated({ page, limit }: { page: number; limit: number }) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      return [prisma, null] as const;
    }

    return prisma.author
      .paginate({
        select: authorListSelect,
      })
      .withPages({
        page,
        limit,
        includePageCount: true,
      });
  }
}
