import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma, { type Role } from "@repo/database";
import discord from "next-auth/providers/discord";
import type { NextAuthConfig, DefaultSession } from "next-auth";

import { env } from "@repo/env-config/env-global";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Additional user information. */
      active: boolean;
      role: Role;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
