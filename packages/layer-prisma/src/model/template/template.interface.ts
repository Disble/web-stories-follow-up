import type { Prisma } from "@repo/database";

export interface TemplateUpdateInput {
  id: string;
  text?: string;
  novelId?: string;
}

export const templateListSelect = {
  id: true,
  text: true,
  novelId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TemplateSelect;

export type TemplateListPayload = Prisma.TemplateGetPayload<{
  select: typeof templateListSelect;
}>;
