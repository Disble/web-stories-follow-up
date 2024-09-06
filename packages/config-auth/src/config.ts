import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@repo/database";
import discord from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";

import { env } from "@repo/env-config/env-global";

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
