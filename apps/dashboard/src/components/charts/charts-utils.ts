"use server";

import { LogAction } from "@repo/database";
import { db } from "@repo/layer-prisma/db";
import { z } from "zod";
import { addDay, format, sameDay } from "@formkit/tempo";
import type { DataBarNovelsScraping } from "./bars/log-bar-scraping";
import type { PublicationListOptions } from "@repo/layer-prisma/model/publication/publication.interface";
import type {
  LogListOptions,
  LogTimeRange,
} from "@repo/layer-prisma/model/log/log.interface";

const NovelScrapingSchema = z.object({
  name: z.string(),
  detail: z.null(),
  duration: z.number(),
  entryType: z.string(),
  startTime: z.number(),
});
export type NovelScraping = z.infer<typeof NovelScrapingSchema>;

const LogScrapeCompleteDetailsSchemaSchema = z.object({
  novelScrapingEnd: NovelScrapingSchema,
  novelScrapingStart: NovelScrapingSchema,
  numberNovelsScraped: z.number(),
  novelScrapingDuration: NovelScrapingSchema,
  novelsScrapedRejectedErrors: z.array(z.string()),
  numberNovelsScrapedRejected: z.number(),
  numberNovelsScrapedFulfilled: z.number(),
});
export type LogScrapeCompleteDetailsSchema = z.infer<
  typeof LogScrapeCompleteDetailsSchemaSchema
>;

export async function getSevenDaysAgoTickValues({
  timeRange = "last-7-days",
}: LogListOptions = {}): Promise<DataBarNovelsScraping | null> {
  const logs = await db.log.getAllLogs({ timeRange });

  if (typeof logs === "string" || logs.length === 0) {
    return null;
  }

  const logScrapeComplete = logs.filter(
    (log) => log.action === LogAction.SCRAPE_COMPLETE
  );

  const logScrapeCompleteDetails = logScrapeComplete
    .map((log) => {
      const parsed = LogScrapeCompleteDetailsSchemaSchema.safeParse(
        log.details
      );
      if (parsed.success) {
        return {
          ...parsed.data,
          createdAt: log.startTime,
        };
      }
      console.error("Failed to parse log details:", parsed.error);
      return null;
    })
    .filter((detail) => detail !== null);

  const logScrapeCompleteStats = logScrapeCompleteDetails.map((detail) => ({
    key: detail.novelScrapingStart.name,
    scrapeFulfilled: detail.numberNovelsScrapedFulfilled,
    scrapeRejected: detail.numberNovelsScrapedRejected,
    scrapeTotal: detail.numberNovelsScraped,
    createdAt: detail.createdAt,
  }));

  const days = getDaysInRange(timeRange);

  const xDaysAgoTickValues = Array.from({ length: days }, (_, i) => {
    return {
      label: format(addDay(new Date(), -i), "MMM DD", "es"),
      value: addDay(new Date(), -i),
    };
  }).reverse();

  const xDaysAgoScraping = xDaysAgoTickValues.map((day) => {
    const { rejected, fulfilled } = logScrapeCompleteStats
      .filter((log) => sameDay(log.createdAt, day.value))
      .reduce(
        (acc, log) => ({
          rejected: acc.rejected + log.scrapeRejected,
          fulfilled: acc.fulfilled + log.scrapeFulfilled,
        }),
        { rejected: 0, fulfilled: 0 }
      );

    return {
      key: day.label,
      "novels-scraping-rejected": -rejected,
      "novels-scraping-fulfilled": fulfilled,
    };
  });

  return xDaysAgoScraping;
}

function getDaysInRange(timeRange: LogTimeRange) {
  const days: Record<LogTimeRange, number> = {
    "last-7-days": 7,
    "last-14-days": 14,
    "last-1-month": 30,
    "last-3-months": 90,
  };

  return days[timeRange];
}

export async function getLast10ChaptersAdded() {
  const chapters = await db.chapter.listLast10ChaptersAdded({
    limit: 10,
  });

  if (typeof chapters === "string") {
    return null;
  }

  return chapters;
}

export async function getPublicationsCalendarData({
  timeRange = "last-3-months",
}: PublicationListOptions = {}) {
  const publications = await db.publication.list({ timeRange });

  if (typeof publications === "string") {
    return null;
  }

  const groupByDate = groupBy(publications, (publication) =>
    format(publication.createdAt, "YYYY-MM-DD")
  );

  const publicationsCalendar = Object.entries(groupByDate).map(
    ([date, publications]) => ({
      day: date,
      value: publications.length,
    })
  );

  return publicationsCalendar;
}

function groupBy<T>(array: T[], keySelector: (item: T) => string) {
  return array.reduce(
    (acc, item) => {
      const key = keySelector(item);
      acc[key] = (acc[key] || []).concat(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
