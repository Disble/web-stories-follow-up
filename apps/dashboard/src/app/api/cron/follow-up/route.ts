import { dailyScrap } from "#crons/daily-scrap";
import { env } from "@repo/env-config/env-global";
import type { NextRequest } from "next/server";

export const revalidate = 0;
export const maxDuration = 60;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    console.info("🔄 Starting daily scrap");
    console.time("🔄 Daily scrap");

    const resp = await dailyScrap();

    for (const res of resp) {
      if (res.status === "rejected") {
        console.error(res.reason);
      }
    }

    const countFulfilled = resp.filter(
      (res) => res.status === "fulfilled"
    ).length;

    console.timeEnd("🔄 Daily scrap");
    console.info(`✅ Daily scrap completed with ${countFulfilled} fulfilled`);

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { error: "Error running daily scrap" },
      { status: 500 }
    );
  }
}
