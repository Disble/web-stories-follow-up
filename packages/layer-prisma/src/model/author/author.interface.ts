import type { Prisma } from "@repo/database";

export const authorListSelect = {
  id: true,
  name: true,
  pseudonym: true,
  urlCoverProfile: true,
} satisfies Prisma.AuthorSelect;

export type AuthorListPayload = Prisma.AuthorGetPayload<{
  select: typeof authorListSelect;
}>;
