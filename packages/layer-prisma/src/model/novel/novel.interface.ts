import type { Prisma } from "@repo/database";

export const novelCardListSelect = {
  id: true,
  title: true,
  slug: true,
  synopsis: true,
  author: {
    select: {
      name: true,
      pseudonym: true,
      urlCoverProfile: true,
    },
  },
  novelPlatforms: {
    select: {
      id: true,
      urlCoverNovel: true,
      urlNovel: true,
      platform: {
        select: {
          code: true,
        },
      },
      _count: {
        select: {
          chapters: true,
        },
      },
    },
  },
  template: true,
} satisfies Prisma.NovelSelect;

export type NovelCardListPayload = Prisma.NovelGetPayload<{
  select: typeof novelCardListSelect;
}>;

export const novelFindBySlugSelect = {
  id: true,
  urlNovel: true,
  urlCoverNovel: true,
  urlAuthorProfile: true,
  novel: {
    select: {
      id: true,
      slug: true,
      title: true,
      synopsis: true,
      note: true,
      status: true,
      author: {
        select: {
          name: true,
          pseudonym: true,
          urlCoverProfile: true,
        },
      },
      template: {
        select: {
          text: true,
        },
      },
    },
  },
  chapters: {
    select: {
      id: true,
      title: true,
      urlChapter: true,
      isTracking: true,
      urlCoverChapter: true,
      publishedAt: true,
      publication: {
        select: {
          status: true,
          idPublishedFacebook: true,
        },
      },
    },
  },
  platform: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.NovelPlatformSelect;

export type NovelFindBySlugPayload = Prisma.NovelPlatformGetPayload<{
  select: typeof novelFindBySlugSelect;
}>;

export const novelListSelect = {
  id: true,
  title: true,
  novelPlatforms: {
    select: {
      id: true,
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
    },
  },
  template: {
    select: {
      text: true,
    },
  },
} satisfies Prisma.NovelSelect;

export type NovelListPayload = Prisma.NovelGetPayload<{
  select: typeof novelListSelect;
}>;
