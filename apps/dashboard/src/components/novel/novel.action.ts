"use server";

import { ChapterStatus } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import { SessionError } from "@repo/types/utils/errors";
import { JSDOM } from "jsdom";
import { revalidatePath } from "next/cache";
import { api } from "@repo/layer-fetch/api";
import type { FeedPublishPostBody } from "@repo/layer-fetch/model/feed/feed.interface";

export async function upsertTemplate(novelId: string, text: string) {
  try {
    const template = await db.template.upsert({
      where: { novelId },
      update: {
        text,
      },
      create: {
        text,
        novelId,
      },
    });

    return template;
  } catch (error) {
    if (error instanceof SessionError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Error al actualizar la plantilla",
    };
  }
}

export async function updateChapters(
  slug: string,
  url: string,
  chapters: NovelFindBySlugPayload["chapters"],
  novelId: string
) {
  const currentChapters = await scrapeCurrentChapters(url);

  if ("error" in currentChapters) {
    return false;
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
    db.chapter.createMany(
      newChaptersOnly.map((chapter) => ({
        title: chapter.title,
        urlChapter: chapter.urlChapter,
        publishedAt: chapter.publishedAt,
        status: ChapterStatus.COMPLETED,
        novelId,
      }))
    );

    db.chapter.deleteMany(removedChapters.map((chapter) => chapter.id));
  }

  revalidatePath(`/novel/${slug}`);

  return true;
}

export async function scrapeCurrentChapters(url: string) {
  try {
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
        const publishedAtStr = story.querySelector(".right-label")?.textContent;
        let publishedAt = null;
        if (
          publishedAtStr?.includes("hours ago") ||
          publishedAtStr?.includes("hour ago") ||
          publishedAtStr?.includes("minutes ago") ||
          publishedAtStr?.includes("a few seconds ago")
        ) {
          publishedAt = new Date().toISOString();
        } else if (publishedAtStr?.includes("a day ago")) {
          publishedAt = new Date(
            new Date().setDate(new Date().getDate() - 1)
          ).toISOString();
        } else if (publishedAtStr) {
          publishedAt = new Date(publishedAtStr).toISOString();
        }

        if (!title || !urlChapter) {
          return null;
        }

        return {
          title,
          urlChapter,
          publishedAt,
          status: ChapterStatus.PENDING,
        };
      })
      .filter((chapter, index, self) => self.indexOf(chapter) === index)
      .filter((chapter) => chapter !== null);

    return allChapters;
  } catch (error) {
    return {
      error: "Error al obtener el contenido de la novela",
    };
  }
}

export async function publishNewChapterInFacebook(body: FeedPublishPostBody) {
  const [post] = await api.feed.publishPost(body);

  if (!post) {
    return {
      error: "Error al publicar el capítulo en Facebook",
    };
  }

  return post;
}
