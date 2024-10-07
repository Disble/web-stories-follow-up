import type { Prisma } from "@repo/database";

export const parameterListSelect = {
  id: true,
  name: true,
  value: true,
} satisfies Prisma.ParameterSelect;

export type ParameterListPayload = Prisma.ParameterGetPayload<{
  select: typeof parameterListSelect;
}>;
