import type { Prisma } from "@repo/database";

export const chapterListSelect = {
  id: true,
  title: true,
  createdAt: true,
  novelPlatform: {
    select: {
      urlCoverNovel: true,
      novel: {
        select: {
          slug: true,
        },
      },
    },
  },
} satisfies Prisma.ChapterSelect;

export type ChapterListPayload = Prisma.ChapterGetPayload<{
  select: typeof chapterListSelect;
}>;
