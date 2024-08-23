import "server-only";

import pagination from "prisma-extension-pagination";

import prisma from "@repo/database";

export abstract class PrismaBuilder {
  protected abstract baseURL: string;
  protected prisma = PrismaBuilder.getClient();

  public constructor() {}

  static getClient() {
    return prisma.$extends(pagination());
  }
}
