import { logActions } from "#lib/consts";
import { LogAction, LogStatus } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import type { PerformanceMark } from "node:perf_hooks";

export async function processNovelScrapingLogs<T>(
  scrapingResults: PromiseSettledResult<T>[],
  novelScrapingStartTime: PerformanceMark,
  novelScrapingEndTime: PerformanceMark
) {
  const novelScrapingDuration = performance.measure(
    "novel-scraping-duration",
    "novel-scraping-start",
    "novel-scraping-end"
  );

  const novelsScrapedRejected = scrapingResults.filter(
    (res) => res.status === "rejected"
  );
  const novelsScrapedRejectedErrors = novelsScrapedRejected.map(
    (res) => res.reason.message
  );

  await db.log.createLog({
    source: logActions.CRON,
    action: LogAction.SCRAPE_COMPLETE,
    status: LogStatus.SUCCESS,
    message: "Daily scraping completed",
    duration: novelScrapingDuration.duration,
    details: {
      novelScrapingStart: novelScrapingStartTime,
      novelScrapingEnd: novelScrapingEndTime,
      novelScrapingDuration: novelScrapingDuration,
      numberNovelsScraped: scrapingResults.length,
      numberNovelsScrapedRejected: novelsScrapedRejected.length,
      novelsScrapedRejectedErrors: novelsScrapedRejectedErrors,
      numberNovelsScrapedFulfilled: scrapingResults.filter(
        (res) => res.status === "fulfilled"
      ).length,
    },
  });

  return {
    novelsScrapedRejectedErrors,
  };
}

export async function processPublicationLogs<T extends number>(
  publicationResults: PromiseSettledResult<T>[],
  publishStartTime: PerformanceMark,
  publishEndTime: PerformanceMark
) {
  const fulfilledPublications = publicationResults
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value);

  const rejectedPublications = publicationResults.filter(
    (res) => res.status === "rejected"
  );

  const chaptersRejectedErrors = rejectedPublications.map(
    (res) => res.reason.message
  );

  const totalChaptersPublished = fulfilledPublications.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const publishDuration = performance.measure(
    "publish-duration",
    "publish-start",
    "publish-end"
  );

  await db.log.createLog({
    source: logActions.CRON,
    action: LogAction.FACEBOOK_PUBLISH,
    status: LogStatus.SUCCESS,
    message: "Daily Facebook publishing completed",
    duration: publishDuration.duration,
    details: {
      publishStart: publishStartTime,
      publishEnd: publishEndTime,
      publishDuration: publishDuration,
      totalChaptersPublished,
      totalChaptersRejected: rejectedPublications.length,
      chaptersRejectedErrors,
    },
  });

  return {
    chaptersRejectedErrors,
    totalChaptersPublished,
    rejectedPublications,
  };
}
