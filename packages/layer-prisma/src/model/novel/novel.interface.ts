import type { Prisma } from "@repo/database";

export const novelCardListSelect = {
  id: true,
  title: true,
  synopsis: true,
  urlCoverNovel: true,
  urlNovel: true,
} satisfies Prisma.NovelSelect;

export type NovelCardListPayload = Prisma.NovelGetPayload<{
  select: typeof novelCardListSelect;
}>;
