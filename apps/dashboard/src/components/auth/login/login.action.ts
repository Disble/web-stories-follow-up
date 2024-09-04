"use server";

import { signIn, signOut } from "@repo/auth-config/auth";

export async function authenticateWithDiscord() {
  await signIn("discord");
}

export async function logOut() {
  await signOut();
}
