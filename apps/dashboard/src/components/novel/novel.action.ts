"use server";
import { PublicationStatus } from "@repo/layer-prisma";
import { db } from "@repo/layer-prisma/db";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import { SessionError } from "@repo/types/utils/errors";
import { revalidatePath } from "next/cache";
import { api } from "@repo/layer-fetch/api";
import type { FeedPublishPostBody } from "@repo/layer-fetch/model/feed/feed.interface";
import { PATH_DASHBOARD } from "#routes/index";
import {
  extractAllChapters,
  fetchPageDocument,
} from "#scrapers/wattpad-scraper";
import { filterChaptersToUpdate, mapChaptersToDb } from "#scrapers/update-db";

export async function upsertTemplate(
  novelId: string,
  text: string,
  slug: string
) {
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

    revalidatePath(`${PATH_DASHBOARD.novel}/${slug}`);

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
  dbChapters: NovelFindBySlugPayload["chapters"],
  novelPlatformId: string
) {
  const currentScrapedChapters = await scrapeCurrentChapters(url);

  if ("error" in currentScrapedChapters) {
    return false;
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
      db.chapter.createMany(newCurrentScrapedChaptersToCreate),
      db.chapter.deleteMany(toRemoveDbChaptersIds),
    ]);
  }

  revalidatePath(`${PATH_DASHBOARD.novel}/${slug}`);

  return true;
}

export async function scrapeCurrentChapters(url: string) {
  try {
    const { document } = await fetchPageDocument(url);
    return extractAllChapters(document, url);
  } catch (error) {
    return {
      error: "Error al obtener el contenido de la novela",
    };
  }
}

export async function publishNewChapterInFacebook(
  body: FeedPublishPostBody,
  slug: string,
  chapterId: string
) {
  const [post] = await api.feed.publishPost(body);

  if (!post) {
    return {
      error: "Error al publicar el capítulo en Facebook",
    };
  }

  const publication = await db.publication.create({
    idPublishedFacebook: post.id,
    message: body.message,
    link: body.link,
    publishedFacebook: true,
    status: PublicationStatus.PUBLISHED,
    chapter: {
      connect: {
        id: chapterId,
      },
    },
  });

  revalidatePath(`${PATH_DASHBOARD.novel}/${slug}`);

  if (!publication) {
    return {
      error:
        "Publicación creada en Facebook, pero no se pudo guardar en la base de datos",
    };
  }

  return post;
}
