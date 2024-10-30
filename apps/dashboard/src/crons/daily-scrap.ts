import { parameters } from "#lib/consts";
import { api } from "@repo/layer-fetch/api";
import type { FeedPublishPostBody } from "@repo/layer-fetch/model/feed/feed.interface";
import { PublicationStatus } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import type { NovelListPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import { JSDOM } from "jsdom";
import {
  parseZonedDateTime,
  now,
  getLocalTimeZone,
} from "@internationalized/date";
import type { ParameterListPayload } from "@repo/layer-prisma/model/parameter/parameter.interface";

export async function dailyScrap() {
  const novels = await db.novel.listActivePreferents();
  const paramPublicationTime = await db.parameter.cronGetByName(
    parameters.FB_PUBLICATION_TIME
  );

  if (!paramPublicationTime) {
    throw new Error("No publication time found");
  }

  const fbPublicationTimeStamp = getPublicationTime(paramPublicationTime);

  const promises = novels.map(async (novel) => {
    const novelPlatformPreferred = novel.novelPlatforms[0];

    if (!novelPlatformPreferred) {
      throw new Error("No preferred novel platform found");
    }

    await updateChapters(
      novelPlatformPreferred.urlNovel,
      novelPlatformPreferred.chapters,
      novelPlatformPreferred.id
    );

    const lastChapters = await db.chapter.cronFindLastChaptersEnabledToPublish(
      novel.id
    );

    if (!novel.template) {
      throw new Error("Novel template is null");
    }

    for (const chapter of lastChapters) {
      const templateWithLink = `${novel.template.text} \n ${chapter.urlChapter}`;

      await publishNewChapterInFacebook(
        {
          message: templateWithLink,
          link: chapter.urlChapter,
          published: "false",
          scheduled_publish_time: fbPublicationTimeStamp.toString(),
        },
        chapter.id
      );
    }
  });

  return Promise.allSettled(promises);
}

export async function updateChapters(
  url: string,
  chapters: NovelListPayload["novelPlatforms"][0]["chapters"],
  novelPlatformId: string
) {
  const currentChapters = await scrapeCurrentChapters(url);

  if ("error" in currentChapters) {
    throw new Error(`Error fetching ${url}`);
  }

  const existingChapterUrls = new Set(
    chapters.map((chapter) => chapter.urlChapter)
  );
  const currentChapterUrls = new Set(
    currentChapters.map((chapter) => chapter.urlChapter)
  );

  const newChaptersOnly = currentChapters.filter(
    (chapter) => !existingChapterUrls.has(chapter.urlChapter)
  );

  const removedChapters = chapters.filter(
    (chapter) => !currentChapterUrls.has(chapter.urlChapter)
  );

  if (newChaptersOnly.length > 0 || removedChapters.length > 0) {
    db.chapter.cronCreateMany(
      newChaptersOnly.map((chapter) => ({
        title: chapter.title,
        urlChapter: chapter.urlChapter,
        publishedAt: chapter.publishedAt,
        novelPlatformId,
        isTracking: true,
      }))
    );

    db.chapter.cronDeleteMany(removedChapters.map((chapter) => chapter.id));
  }
}

export async function scrapeCurrentChapters(url: string) {
  const originUrl = new URL(url).origin;

  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const stories = document.querySelectorAll(
    ".table-of-contents a.story-parts__part"
  );

  const allChapters = Array.from(stories)
    .map((story) => {
      const title = story.querySelector(".part-title")?.textContent;
      const urlChapter = story.getAttribute("href");
      const fullUrlChapter = `${originUrl}${urlChapter}`;
      const publishedAtStr = story.querySelector(".right-label")?.textContent;
      let publishedAt = null;
      if (
        publishedAtStr?.includes("hours ago") ||
        publishedAtStr?.includes("hour ago") ||
        publishedAtStr?.includes("minutes ago") ||
        publishedAtStr?.includes("a few seconds ago")
      ) {
        const today = now(getLocalTimeZone());
        publishedAt = today.toDate().toISOString();
      } else if (publishedAtStr?.includes("a day ago")) {
        const today = now(getLocalTimeZone());
        today.subtract({ days: 1 });
        publishedAt = today.toDate().toISOString();
      } else if (publishedAtStr) {
        publishedAt = new Date(publishedAtStr).toISOString();
      }

      if (!title || !urlChapter) {
        return null;
      }

      return {
        title,
        urlChapter: fullUrlChapter,
        publishedAt,
      };
    })
    .filter((chapter, index, self) => self.indexOf(chapter) === index)
    .filter((chapter) => chapter !== null);

  return allChapters;
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

  const publication = await db.publication.cronCreate({
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

  if (!publication) {
    throw new Error(
      "Publication created in Facebook, but could not save to database"
    );
  }
}

function getPublicationTime(paramPublicationTime: ParameterListPayload) {
  const fbPublicationZonedDateTime = parseZonedDateTime(
    paramPublicationTime.value
  );
  const today = now(getLocalTimeZone());

  fbPublicationZonedDateTime.set({
    year: today.year,
    month: today.month,
    day: today.day,
  });

  const offsetInMiliseconds = fbPublicationZonedDateTime.toDate().getTime();
  const offsetInSeconds = Math.floor(offsetInMiliseconds / 1000);

  return offsetInSeconds;
}
