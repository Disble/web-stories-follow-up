"use server";

import { PATH_DASHBOARD } from "#routes/index";
import { db } from "@repo/layer-prisma/db";
import { revalidatePath } from "next/cache";

export async function toggleUserActivation(userId: string, activate: boolean) {
  try {
    const user = await db.user.updateById(userId, { active: activate });

    revalidatePath(PATH_DASHBOARD.users.list);

    return user;
  } catch (error) {
    return {
      error: `Error al ${activate ? "activar" : "desactivar"} el usuario`,
    };
  }
}
