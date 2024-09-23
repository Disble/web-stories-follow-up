import type { Prisma } from "@repo/database";

export const novelCardListSelect = {
  id: true,
  title: true,
  synopsis: true,
  urlCoverNovel: true,
  urlNovel: true,
  authors: {
    select: {
      author: {
        select: {
          id: true,
          name: true,
          urlProfile: true,
          pseudonym: true,
          urlCoverProfile: true,
        },
      },
    },
  },
  _count: {
    select: {
      chapters: true,
    },
  },
} satisfies Prisma.NovelSelect;

export type NovelCardListPayload = Prisma.NovelGetPayload<{
  select: typeof novelCardListSelect;
}>;
