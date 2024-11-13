import { PrismaDB } from "#abstract-factory/prisma-db.abstract";
import type { Prisma } from "@repo/database";

export class LogModel extends PrismaDB {
  public async createLog(data: Prisma.LogCreateArgs["data"]) {
    const prisma = await this.connect.public();

    return await prisma.log.create({
      data,
    });
  }
}
