import type { NextAuthResult } from "next-auth";
import NextAuth from "next-auth";

import { authConfig } from "./config";

const nextAuth = NextAuth(authConfig);

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const auth: NextAuthResult["auth"] = nextAuth.auth;

export const { handlers, signOut } = nextAuth;
