"use server";

import { parameters } from "#lib/consts";
import { db } from "@repo/layer-prisma/db";

export async function updateFbPublicationTime(time: string) {
  try {
    const fbPublicationTime = await db.parameter.updateByName(
      parameters.FB_PUBLICATION_TIME,
      {
        value: time,
      }
    );

    return fbPublicationTime;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
