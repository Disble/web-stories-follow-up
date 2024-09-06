import "server-only";

import pagination from "prisma-extension-pagination";

import prisma from "@repo/database";
import { auth } from "@repo/auth-config/auth";
import { SessionError } from "@repo/types/utils/errors";

/**
 * This is like a middleware for the prisma client, it is used to connect to
 * the database with the user session.
 */
export class PrismaAuthMiddleware {
  private publicClient: ReturnType<typeof this.getClient> | null = null;
  private protectedClient: ReturnType<typeof this.getClientProtected> | null =
    null;

  protected get connect() {
    return {
      public: this.publicClient || (this.publicClient = this.getClient()),
      protected:
        this.protectedClient ||
        (this.protectedClient = this.getClientProtected()),
    };
  }

  private getClient() {
    return async () => prisma.$extends(pagination());
  }

  private getClientProtected() {
    return async () => {
      const session = await auth();

      if (!session?.user) {
        return new SessionError("No session found");
      }

      return this.getClient()();
    };
  }
}
