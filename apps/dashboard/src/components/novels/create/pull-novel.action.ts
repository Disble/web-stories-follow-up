"use server";

import { db } from "@repo/layer-prisma/db";
import type { Prisma } from "@repo/layer-prisma";

export async function createFullNovel(data: Prisma.NovelCreateInput) {
  await db.novel.create(data);
}
