import { dailyScrap } from "#crons/daily-scraper";
import { logActions } from "#lib/consts";
import { env } from "@repo/env-config/env-global";
import { LogAction, LogStatus, type Prisma } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
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

  // Log the request
  const startTime = performance.mark("cron-start");

  try {
    await db.log.createLog({
      source: logActions.CRON,
      action: LogAction.CRON_START,
      message: "Starting daily cron job operation",
    });

    console.info("🔄 Starting daily scrap");
    console.time("🔄 Daily scrap");

    const {
      novelsScrapedRejectedErrors,
      publicationResults,
      chaptersRejectedErrors,
      totalChaptersPublished,
      totalChaptersRejected,
      numberNovelsScraped,
    } = await dailyScrap();

    const causes = [...chaptersRejectedErrors, ...novelsScrapedRejectedErrors];

    console.timeEnd("🔄 Daily scrap");
    const message = `✅ Daily scrap completed with ${numberNovelsScraped} novels scraped, ${totalChaptersPublished} chapters published and ${totalChaptersRejected} chapters rejected`;
    console.info(message);

    const endTime = performance.mark("cron-end");
    const duration = performance.measure(
      "cron-duration",
      "cron-start",
      "cron-end"
    );

    if (
      publicationResults.length > 0 &&
      publicationResults.every((res) => res.status === "rejected")
    ) {
      const errorMessage =
        "🟠 Daily scraping completed with all novel chapters rejected";

      await db.log.createLog({
        source: logActions.CRON,
        action: LogAction.ERROR,
        status: LogStatus.ERROR,
        message: errorMessage,
        details: {
          numberNovelsScraped,
          totalChaptersPublished,
          totalChaptersRejected,
          errors: causes,
          duration: {
            cronStart: startTime,
            cronEnd: endTime,
            cronDuration: duration.duration,
          },
        },
        duration: duration.duration,
        httpStatus: 500,
        error: causes as Prisma.JsonArray,
      });

      return Response.json(
        {
          status: "ERROR",
          error: errorMessage,
          cause: causes,
        },
        { status: 500 }
      );
    }

    await db.log.createLog({
      source: logActions.CRON,
      action: LogAction.CRON_COMPLETE,
      status: LogStatus.SUCCESS,
      message,
      details: {
        numberNovelsScraped,
        totalChaptersPublished,
        totalChaptersRejected,
        errors: causes,
        duration: {
          cronStart: startTime,
          cronEnd: endTime,
          cronDuration: duration,
        },
      },
      duration: duration.duration,
      httpStatus: 200,
    });

    return Response.json({
      status: "SUCCESS",
      message: message,
      cause: causes,
    });
  } catch (error) {
    const endTime = performance.mark("cron-end");
    const duration = performance.measure(
      "cron-duration",
      "cron-start",
      "cron-end"
    );

    await db.log.createLog({
      source: logActions.CRON,
      action: LogAction.ERROR,
      status: LogStatus.ERROR,
      message: "🔴 Daily scraping failed",
      duration: duration.duration,
      details: {
        cronStart: startTime,
        cronEnd: endTime,
        cronDuration: duration,
      },
      httpStatus: 500,
      error:
        error instanceof Error
          ? ({ message: error.message } as Prisma.JsonObject)
          : (error as Prisma.JsonObject),
    });

    if (error instanceof Error) {
      return Response.json(
        { status: "ERROR", error: error.message },
        { status: 500 }
      );
    }

    return Response.json(
      { status: "ERROR", error: "Error running daily cron job" },
      { status: 500 }
    );
  } finally {
    performance.clearMarks();
    performance.clearMeasures();
  }
}
