import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import {
  type PublicationListOptions,
  publicationListSelect,
  publicationListSimpleSelect,
  type PublicationTimeRange,
} from "./publication.interface";

export class PublicationModel extends PrismaDB {
  public async create(data: Prisma.PublicationCreateInput) {
    const prisma = await this.connect.protected();

    if (prisma instanceof SessionError) {
      throw prisma;
    }

    if (!data.chapter.connect?.id) {
      throw new Error("Chapter ID is required");
    }

    return prisma.$transaction([
      prisma.publication.create({
        data,
      }),
      prisma.chapter.update({
        where: {
          id: data.chapter.connect.id,
        },
        data: {
          isTracking: false,
        },
      }),
    ]);
  }

  public async cronCreate(data: Prisma.PublicationCreateInput) {
    const prisma = await this.connect.public();

    if (!data.chapter.connect?.id) {
      throw new Error("Chapter ID is required");
    }

    const [publication] = await prisma.$transaction([
      prisma.publication.create({
        data,
      }),
      prisma.chapter.update({
        where: {
          id: data.chapter.connect.id,
        },
        data: {
          isTracking: false,
        },
      }),
    ]);

    return publication;
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

  public async list({
    timeRange = "last-3-months",
  }: PublicationListOptions = {}) {
    const prisma = await this.connect.protected();

    const months: Record<PublicationTimeRange, number> = {
      "last-3-months": 3,
      "last-6-months": 6,
      "last-12-months": 12,
    };

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return prisma.publication.findMany({
      where: {
        createdAt: {
          gte: new Date(
            new Date().setMonth(new Date().getMonth() - months[timeRange])
          ),
        },
      },
      select: publicationListSimpleSelect,
    });
  }
}
