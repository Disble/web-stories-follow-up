"use server";
import { db } from "@repo/layer-prisma/db";
import type { Prisma } from "@repo/layer-prisma";
import { z } from "zod";
import { uniqueSpaceSlug, digits } from "space-slug";
import {
  extractAllChapters,
  extractSynopsis,
  extractTitle,
  extractUrlCoverNovel,
  fetchPageDocument,
  extractAuthorProfile,
} from "#scrapers/wattpad-scraper";

type CreateFullNovelData = {
  novelPlatform: Pick<
    Prisma.NovelPlatformCreateInput,
    "urlNovel" | "urlCoverNovel" | "urlAuthorProfile"
  >;
  novel: Pick<Prisma.NovelCreateInput, "title" | "synopsis" | "note">;
  authorCreate: Pick<
    Prisma.AuthorCreateInput,
    "name" | "pseudonym" | "urlCoverProfile"
  >;
  authorConnect: Pick<Prisma.AuthorCreateInput, "id">;
  chapters: Prisma.ChapterCreateManyNovelPlatformInput[];
  platformId: string;
};

export async function createFullNovel(data: CreateFullNovelData) {
  const slug = await uniqueSpaceSlug([digits(9), data.novel.title], {
    separator: "-",
    isUnique: async (slug) => {
      const count = await db.novel.countBySlug(slug);
      if (typeof count === "string") return false;
      return count === 0;
    },
  });

  await db.novel.create({
    isPreferred: true,
    urlNovel: data.novelPlatform.urlNovel,
    urlCoverNovel: data.novelPlatform.urlCoverNovel,
    urlAuthorProfile: data.novelPlatform.urlAuthorProfile,
    novel: {
      create: {
        title: data.novel.title,
        slug,
        synopsis: data.novel.synopsis,
        note: data.novel.note,
        author: {
          connectOrCreate: {
            where: { id: data.authorConnect.id },
            create: data.authorCreate,
          },
        },
      },
    },
    platform: {
      connect: { id: data.platformId },
    },
    chapters: {
      createMany: {
        data: data.chapters,
      },
    },
  });
}

const urlSchema = z.string().url("La URL de la novela no es válida");
const urlRelativeSchema = z.string().regex(/\/(?:[\w-]+\/)*[\w-]+/);

const dataNovelServer = z.object({
  urlNovel: urlSchema,
  title: z.string(),
  synopsis: z.string(),
  note: z.string().optional(),
  urlCoverNovel: urlSchema,
  chapters: z.array(
    z.object({
      title: z.string(),
      urlChapter: urlRelativeSchema,
      urlCoverChapter: urlSchema.optional(),
      publishedAt: z.string().nullable(),
    })
  ),
  authorName: z.string(),
  authorPseudonym: z.string(),
  authorUrlProfile: urlRelativeSchema,
  authorUrlCoverProfile: urlSchema.optional(),
});

type DataNovelServer = z.infer<typeof dataNovelServer>;

export async function scrapeNovel(url: string) {
  try {
    const { document, dom } = await fetchPageDocument(url);

    const title = extractTitle(document);
    const synopsis = extractSynopsis(document, dom);
    const urlCoverNovel = extractUrlCoverNovel(document);

    if (!title || !urlCoverNovel) {
      throw new Error("Can't get title or urlCoverNovel");
    }

    const allChapters = extractAllChapters(document, url);

    const { authorPseudonym, authorUrlProfile, authorUrlCoverProfile } =
      extractAuthorProfile(document);

    const formData = {
      urlNovel: url,
      title,
      synopsis,
      note: "",
      urlCoverNovel,
      chapters: allChapters,
      authorName: "",
      authorPseudonym,
      authorUrlProfile,
      authorUrlCoverProfile,
    } satisfies DataNovelServer;
    return formData;
  } catch (error) {
    return {
      error: "Error al obtener el contenido de la novela",
    };
  }
}

export async function findNovelByUrlNovel(urlNovel: string) {
  const novel = await db.novel.findByUrlNovel(urlNovel);

  if (typeof novel === "string") {
    return {
      error: novel,
    } as const;
  }

  if (!novel) {
    return {
      error: "Novela no encontrada",
    } as const;
  }

  return novel;
}

export async function findAuthorByPseudonym(pseudonym: string) {
  const author = await db.author.getByPseudonym(pseudonym);

  if (typeof author === "string") {
    return {
      error: author,
    } as const;
  }

  return author;
}
