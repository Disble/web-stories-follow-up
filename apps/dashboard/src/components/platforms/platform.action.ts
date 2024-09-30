"use server";

import type { Prisma } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";

export async function isExistPlatform(code: string) {
  try {
    const platform = await db.platform.getPlatformByCode(code);

    if (typeof platform === "string") {
      throw new Error(platform);
    }

    if (platform === null) return false;
    return typeof platform === "object";
  } catch (error) {
    return {
      error: "Error al validar la plataforma",
    };
  }
}

export async function createPlatform(data: Prisma.PlatformCreateInput) {
  try {
    const platform = await db.platform.create(data);

    return platform;
  } catch (error) {
    if (error instanceof SessionError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Error al crear la plataforma",
    };
  }
}
