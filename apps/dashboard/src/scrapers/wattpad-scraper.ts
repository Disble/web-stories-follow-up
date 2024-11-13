import { now } from "@internationalized/date";
import { JSDOM } from "jsdom";
import { getLocalTimeZone } from "@internationalized/date";

export async function fetchPageDocument(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return {
    document,
    dom,
  };
}

export function extractTableOfContents(document: Document) {
  return document.querySelectorAll(".table-of-contents a.story-parts__part");
}

export function extractTitle(document: Document) {
  return document.querySelector("div.story-info>span.sr-only")?.textContent;
}

export function extractSynopsis(document: Document, dom: JSDOM) {
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

  return synopsis;
}

export function extractUrlCoverNovel(document: Document) {
  return document.querySelector("div.story-cover>img")?.getAttribute("src");
}

export function extractAllChapters(document: Document, url: string) {
  const originUrl = new URL(url).origin;
  const tableOfContents = extractTableOfContents(document);
  const allChapters = Array.from(tableOfContents)
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

  if (allChapters.length === 0) {
    throw new Error(`0 chapters scraped in ${url}`);
  }

  return allChapters;
}

export function extractAuthorProfile(document: Document) {
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

  return {
    authorPseudonym,
    authorUrlProfile,
    authorUrlCoverProfile,
  };
}
