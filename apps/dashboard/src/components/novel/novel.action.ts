"use server";

import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";

export async function upsertTemplate(novelId: string, text: string) {
  try {
    const template = await db.template.upsert({
      where: { novelId },
      update: {
        text,
      },
      create: {
        text,
        novelId,
      },
    });

    return template;
  } catch (error) {
    if (error instanceof SessionError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Error al actualizar la plantilla",
    };
  }
}
