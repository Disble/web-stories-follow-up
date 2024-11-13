import { parameters } from "#lib/consts";
import { api } from "@repo/layer-fetch/api";
import type { FeedPublishPostBody } from "@repo/layer-fetch/model/feed/feed.interface";
import { PublicationStatus } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import type { NovelListPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import {
  parseZonedDateTime,
  now,
  getLocalTimeZone,
} from "@internationalized/date";
import type { ParameterListPayload } from "@repo/layer-prisma/model/parameter/parameter.interface";
import { performance } from "node:perf_hooks";
import {
  extractAllChapters,
  fetchPageDocument,
} from "#scrapers/wattpad-scraper";
import { filterChaptersToUpdate, mapChaptersToDb } from "#scrapers/update-db";
import {
  processNovelScrapingLogs,
  processPublicationLogs,
} from "#scrapers/cron-logs";

export async function dailyScrap() {
  const novels = await db.novel.listActivePreferents();
  const paramPublicationTime = await db.parameter.cronGetByName(
    parameters.FB_PUBLICATION_TIME
  );

  if (!paramPublicationTime) {
    throw new Error("No publication time found");
  }

  const fbPublicationTimeStamp = getPublicationTime(paramPublicationTime);

  const novelScrapingStartTime = performance.mark("novel-scraping-start");
  const scrapingPromises = novels.map(async (novel) => {
    const novelPlatformPreferred = novel.novelPlatforms[0];

    if (!novelPlatformPreferred) {
      throw new Error("No preferred novel platform found");
    }

    await updateChapters(
      novelPlatformPreferred.urlNovel,
      novelPlatformPreferred.chapters,
      novelPlatformPreferred.id
    );
  });

  const scrapingResults = await Promise.allSettled(scrapingPromises);
  const novelScrapingEndTime = performance.mark("novel-scraping-end");

  const { novelsScrapedRejectedErrors } = await processNovelScrapingLogs(
    scrapingResults,
    novelScrapingStartTime,
    novelScrapingEndTime
  );

  const publishStartTime = performance.mark("publish-start");
  const publicationPromises = novels.map(async (novel) => {
    const lastChapters = await db.chapter.cronFindLastChaptersEnabledToPublish(
      novel.id
    );

    if (!novel.template) {
      throw new Error("Novel template is null");
    }

    let fulfilledPublicationsByNovel = 0;

    for (const chapter of lastChapters) {
      const templateWithLink = `${novel.template.text} \n\n${chapter.urlChapter}`;

      const dbPublication = await publishNewChapterInFacebook(
        {
          message: templateWithLink,
          link: chapter.urlChapter,
          published: "false",
          scheduled_publish_time: fbPublicationTimeStamp.toString(),
        },
        chapter.id
      );

      dbPublication && fulfilledPublicationsByNovel++;
    }

    return fulfilledPublicationsByNovel;
  });

  const publicationResults = await Promise.allSettled(publicationPromises);
  const publishEndTime = performance.mark("publish-end");

  const {
    chaptersRejectedErrors,
    totalChaptersPublished,
    rejectedPublications,
  } = await processPublicationLogs(
    publicationResults,
    publishStartTime,
    publishEndTime
  );

  return {
    novelsScrapedRejectedErrors,
    publicationResults,
    chaptersRejectedErrors,
    totalChaptersPublished,
    totalChaptersRejected: rejectedPublications.length,
    numberNovelsScraped: novels.length,
  };
}

export async function updateChapters(
  url: string,
  dbChapters: NovelListPayload["novelPlatforms"][0]["chapters"],
  novelPlatformId: string
) {
  const currentScrapedChapters = await scrapeCurrentChapters(url);

  if ("error" in currentScrapedChapters) {
    throw new Error(`Error fetching or scraping ${url}`);
  }

  const { newCurrentScrapedChapters, toRemoveDbChapters } =
    filterChaptersToUpdate(currentScrapedChapters, dbChapters);

  if (newCurrentScrapedChapters.length > 0 || toRemoveDbChapters.length > 0) {
    const { newCurrentScrapedChaptersToCreate, toRemoveDbChaptersIds } =
      mapChaptersToDb(
        newCurrentScrapedChapters,
        toRemoveDbChapters,
        novelPlatformId
      );

    await Promise.all([
      db.chapter.cronCreateMany(newCurrentScrapedChaptersToCreate),
      db.chapter.cronDeleteMany(toRemoveDbChaptersIds),
    ]);
  }
}

export async function scrapeCurrentChapters(url: string) {
  const { document } = await fetchPageDocument(url);
  return extractAllChapters(document, url);
}

export async function publishNewChapterInFacebook(
  body: Extract<FeedPublishPostBody, { published: "false" }>,
  chapterId: string
) {
  const [post] = await api.feed.publishPost(body, {
    isPublic: true,
  });

  if (!post) {
    throw new Error("Error publishing chapter in Facebook");
  }

  const dbPublication = await db.publication.cronCreate({
    idPublishedFacebook: post.id,
    message: body.message,
    link: body.link,
    publishedFacebook: false,
    status: PublicationStatus.PUBLISHED,
    scheduledPublishTime: Number.parseInt(body.scheduled_publish_time),
    chapter: {
      connect: {
        id: chapterId,
      },
    },
  });

  if (!dbPublication) {
    throw new Error(
      "Publication created in Facebook, but could not save to database"
    );
  }

  return dbPublication;
}

function getPublicationTime(paramPublicationTime: ParameterListPayload) {
  const fbPublicationZonedDateTime = parseZonedDateTime(
    paramPublicationTime.value
  );
  const today = now(getLocalTimeZone());

  const fbPublicationZonedDateTimeUpdated = fbPublicationZonedDateTime.set({
    year: today.year,
    month: today.month,
    day: today.day,
  });

  const offsetInMiliseconds = fbPublicationZonedDateTimeUpdated
    .toDate()
    .getTime();
  const offsetInSeconds = Math.floor(offsetInMiliseconds / 1000);

  return offsetInSeconds;
}
