import type { Prisma } from "@repo/database";

export const novelCardListSelect = {
  id: true,
  title: true,
  slug: true,
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

export const novelFindBySlugSelect = {
  id: true,
  title: true,
  slug: true,
  synopsis: true,
  urlCoverNovel: true,
  urlNovel: true,
  chapters: {
    select: {
      id: true,
      title: true,
      publishedAt: true,
      urlCoverChapter: true,
      urlChapter: true,
      publication: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
  platforms: {
    select: {
      platform: {
        select: {
          name: true,
          baseUrl: true,
        },
      },
    },
  },
  authors: {
    select: {
      author: {
        select: {
          name: true,
          pseudonym: true,
          urlProfile: true,
        },
      },
    },
  },
  template: {
    select: {
      id: true,
      text: true,
    },
  },
} satisfies Prisma.NovelSelect;

export type NovelFindBySlugPayload = Prisma.NovelGetPayload<{
  select: typeof novelFindBySlugSelect;
}>;

export const novelListSelect = {
  id: true,
  title: true,
  urlNovel: true,
  chapters: {
    select: {
      id: true,
      title: true,
      publishedAt: true,
      urlCoverChapter: true,
      urlChapter: true,
      publication: true,
    },
  },
  template: {
    select: {
      text: true,
    },
  },
  platforms: {
    select: {
      platform: {
        select: {
          baseUrl: true,
        },
      },
    },
  },
} satisfies Prisma.NovelSelect;

export type NovelListPayload = Prisma.NovelGetPayload<{
  select: typeof novelListSelect;
}>;
