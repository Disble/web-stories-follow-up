import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";
import { SessionError } from "@repo/types/utils/errors";
import type { LogListOptions, LogTimeRange } from "./log.interface";

export class LogModel extends PrismaDB {
  public async createLog(data: Prisma.LogCreateArgs["data"]) {
    const prisma = await this.connect.public();

    return await prisma.log.create({
      data,
    });
  }

  public async getAllLogs({ timeRange = "last-7-days" }: LogListOptions = {}) {
    const prisma = await this.connect.protected();

    const days: Record<LogTimeRange, number> = {
      "last-7-days": 7,
      "last-14-days": 14,
      "last-1-month": 30,
      "last-3-months": 90,
    };

    if (prisma instanceof SessionError) {
      return prisma.message;
    }

    return await prisma.log.findMany({
      where: {
        startTime: {
          gte: new Date(Date.now() - days[timeRange] * 24 * 60 * 60 * 1000),
        },
      },
    });
  }
}
