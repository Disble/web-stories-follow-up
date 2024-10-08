import type { Prisma } from "@repo/database";

export const userListSelect = {
  id: true,
  name: true,
  email: true,
  active: true,
  image: true,
  role: true,
} satisfies Prisma.UserSelect;

export type UserListPayload = Prisma.UserGetPayload<{
  select: typeof userListSelect;
}>;
