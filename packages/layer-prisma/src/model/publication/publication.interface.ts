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
      novel: {
        select: {
          slug: true,
          platforms: {
            select: {
              platform: {
                select: {
                  name: true,
                },
              },
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
