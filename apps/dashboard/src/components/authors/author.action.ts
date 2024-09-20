"use server";

import type { Prisma } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";

export async function isExistAuthor(pseudonym: string) {
  try {
    const author = await db.author.getAuthorByPseudonym(pseudonym);

    if (typeof author === "string") {
      throw new Error(author);
    }

    if (author === null) return false;
    return typeof author === "object";
  } catch (error) {
    return {
      error: "Error al validar el autor",
    };
  }
}

export async function createAuthor(data: Prisma.AuthorCreateInput) {
  try {
    const author = await db.author.createAuthor(data);

    return author;
  } catch (error) {
    if (error instanceof SessionError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Error al crear el autor",
    };
  }
}
