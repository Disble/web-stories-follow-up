import type { NextRequest } from "next/server";

export const revalidate = 0;
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  console.info("👋 Hello from cron job follow-up");

  return Response.json({ success: true });
}
