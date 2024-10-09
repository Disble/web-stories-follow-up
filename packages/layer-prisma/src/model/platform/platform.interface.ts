import type { Prisma } from "@repo/database";

export const platformListSelect = {
  id: true,
  name: true,
  code: true,
  baseUrl: true,
  urlCover: true,
} satisfies Prisma.PlatformSelect;

export type PlatformListPayload = Prisma.PlatformGetPayload<{
  select: typeof platformListSelect;
}>;

export const platformGetByNameSelect = {
  id: true,
  name: true,
  baseUrl: true,
  urlCover: true,
} satisfies Prisma.PlatformSelect;

export type PlatformGetByNamePayload = Prisma.PlatformGetPayload<{
  select: typeof platformGetByNameSelect;
}>;
