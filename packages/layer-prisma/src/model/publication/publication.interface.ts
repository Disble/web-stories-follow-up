import type { Prisma } from "@repo/database";

export const publicationListSelect = {
  id: true,
  idPublishedFacebook: true,
  message: true,
  link: true,
  publishedFacebook: true,
  scheduledPublishTime: true,
  status: true,
  createdAt: true,
  chapter: {
    select: {
      novelPlatform: {
        select: {
          platform: {
            select: {
              name: true,
            },
          },
          novel: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.PublicationSelect;

export type PublicationListPayload = Prisma.PublicationGetPayload<{
  select: typeof publicationListSelect;
}>;
