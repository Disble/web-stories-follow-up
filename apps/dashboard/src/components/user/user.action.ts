"use server";

import { PATH_DASHBOARD } from "#routes/index";
import { db } from "@repo/layer-prisma/db";
import { revalidatePath } from "next/cache";

export async function desactivateUser(userId: string) {
  try {
    const user = await db.user.updateById(userId, { active: false });

    revalidatePath(PATH_DASHBOARD.users.list);

    return user;
  } catch (error) {
    return {
      error: "Error al desactivar el usuario",
    };
  }
}
