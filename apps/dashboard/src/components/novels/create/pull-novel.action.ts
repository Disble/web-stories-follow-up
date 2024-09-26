"use server";
import { db } from "@repo/layer-prisma/db";
import { ChapterStatus, type Prisma } from "@repo/layer-prisma";
import { JSDOM } from "jsdom";
import { z } from "zod";
import { uniqueSpaceSlug, digits, word } from "space-slug";

export async function createFullNovel(
  data: Omit<Prisma.NovelCreateInput, "slug">
) {
  const slug = await uniqueSpaceSlug([digits(9), data.title], {
    separator: "-",
    isUnique: async (slug) => {
      const count = await db.novel.countBySlug(slug);
      if (typeof count === "string") return false;
      return count === 0;
    },
  });
  await db.novel.create({
    ...data,
    slug,
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
      status: z.nativeEnum(ChapterStatus),
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
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = document.querySelector("div.story-info__title")?.textContent;
    const synopsisElement = document.querySelector(
      "pre.description-text.collapsed"
    );
    const synopsis = synopsisElement
      ? Array.from(synopsisElement.childNodes)
          .filter(
            (node): node is Text => node.nodeType === dom.window.Node.TEXT_NODE
          )
          .map((textNode) => textNode.textContent?.trim() ?? "")
          .join(" ")
      : "";

    const urlCoverNovel = document
      .querySelector("div.story-cover>img")
      ?.getAttribute("src");

    if (!title || !urlCoverNovel) {
      throw new Error("Can't get title or urlCoverNovel");
    }

    const stories = document.querySelectorAll(
      ".table-of-contents a.story-parts__part"
    );

    const allChapters = Array.from(stories)
      .map((story) => {
        const title = story.querySelector(".part-title")?.textContent;
        const urlChapter = story.getAttribute("href");
        const publishedAtStr = story.querySelector(".right-label")?.textContent;
        let publishedAt = null;
        if (publishedAtStr?.includes("hours ago")) {
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

    const authorPseudonymElement = document.querySelector(
      "div.author-info__username>a"
    );

    const authorPseudonym = authorPseudonymElement?.textContent;
    const authorUrlProfile = authorPseudonymElement?.getAttribute("href");

    if (!authorPseudonym || !authorUrlProfile) {
      throw new Error("Can't get authorPseudonym or authorUrlProfile");
    }

    const authorProfilePhotoEl = document.querySelector(".author-info__badge");

    const authorUrlCoverProfile =
      authorProfilePhotoEl?.getAttribute("src") ?? undefined;

    const formData = {
      urlNovel: url,
      title,
      synopsis,
      note: "",
      urlCoverNovel: urlCoverNovel,
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
