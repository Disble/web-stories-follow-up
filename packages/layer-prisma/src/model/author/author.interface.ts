import type { Prisma } from "@repo/database";

export const authorListSelect = {
  id: true,
  name: true,
  pseudonym: true,
  urlCoverProfile: true,
  _count: {
    select: {
      novels: true,
    },
  },
  novels: {
    select: {
      novelPlatforms: {
        select: {
          urlAuthorProfile: true,
          platform: {
            select: {
              id: true,
              baseUrl: true,
              name: true,
            },
          },
        },
      },
    },
  },
  createdAt: true,
} satisfies Prisma.AuthorSelect;

export type AuthorListPayload = Prisma.AuthorGetPayload<{
  select: typeof authorListSelect;
}>;
