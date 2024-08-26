import NextAuth, { NextAuthResult } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@repo/database";
import discord from "next-auth/providers/discord";

const nextAuth = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
});

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
 
export const { handlers, signOut } = nextAuth;
