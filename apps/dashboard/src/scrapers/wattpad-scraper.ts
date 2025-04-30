import { now, getLocalTimeZone } from "@internationalized/date";
import { JSDOM } from "jsdom";

/**
 * Fetches a page and returns its document and DOM object.
 */
export async function fetchPageDocument(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  return { document, dom };
}

/**
 * Takes the title directly from the document's <title> and trims
 * everything after " – " (which is " – Author – Wattpad").
 */
export function extractTitle(document: Document): string | null {
  if (!document.title) return null;
  return document.title.split(" – ")[0].trim();
}

/**
 * The "synopsis" is in a <pre> inside a container <div class="glL-c">.
 * Since that class seems stable (not a hash), we use it with > pre.
 */
export function extractSynopsis(document: Document): string {
  const pre = document.querySelector("div.glL-c > pre");
  return pre?.textContent?.trim() ?? "";
}

/**
 * The cover always lives in:
 *   <div data-testid="cover"><img src="…"></div>
 */
export function extractUrlCoverNovel(document: Document): string | undefined {
  return (
    document
      .querySelector('div[data-testid="cover"] img')
      ?.getAttribute("src") ?? undefined
  );
}

/**
 * All parts of the table of contents are under:
 *   <div data-testid="toc">
 *     <ul aria-label="story-parts">
 *       <a href="…">…</a>
 *     </ul>
 *   </div>
 */
export function extractTableOfContents(
  document: Document
): NodeListOf<HTMLAnchorElement> {
  return document.querySelectorAll(
    'div[data-testid="toc"] ul[aria-label="story-parts"] a'
  );
}

/**
 * Extracts title, url and publication date from each chapter.
 * We use:
 *   - link.href                        → the URL
 *   - link.querySelector('[data-testid="new-part-icon"] + div')
 *       .textContent                  → the title text
 *   - link.children[1].textContent   → the date (it's the second <div>)
 */
export function extractAllChapters(document: Document, url: string) {
  const toc = extractTableOfContents(document);
  if (toc.length === 0) {
    throw new Error(`0 chapters scraped in ${url}`);
  }

  const chapters = Array.from(toc).map((link) => {
    const titleEl = link.querySelector('[data-testid="new-part-icon"] + div');
    const title = titleEl?.textContent?.trim() ?? null;
    const urlChapter = link.href;
    const dateStr = link.children[1]?.textContent?.trim() ?? "";

    let publishedAt: string | null = null;
    if (/hours? ago|minutes? ago|seconds? ago/.test(dateStr)) {
      publishedAt = now(getLocalTimeZone()).toDate().toISOString();
    } else if (/a day ago/.test(dateStr)) {
      const today = now(getLocalTimeZone()).subtract({ days: 1 });
      publishedAt = today.toDate().toISOString();
    } else if (dateStr) {
      publishedAt = new Date(dateStr).toISOString();
    }

    if (!title || !urlChapter) return null;
    return { title, urlChapter, publishedAt };
  });

  // Filter out nulls and duplicates by URL
  const unique = chapters
    .filter((c): c is NonNullable<typeof c> => !!c)
    .filter(
      (c, i, all) => all.findIndex((c2) => c2.urlChapter === c.urlChapter) === i
    );

  if (unique.length === 0) {
    throw new Error(`0 chapters scraped in ${url}`);
  }
  return unique;
}

/**
 * Author profile:
 *   <a href="/user/..." aria-label="by NAME. Tap to go to the author's profile page.">
 *     Name
 *   </a>
 * right before an <img> with the avatar.
 */
export function extractAuthorProfile(document: Document) {
  const authorLink = document.querySelector<HTMLAnchorElement>(
    'a[aria-label^="by "]'
  );
  if (!authorLink) {
    throw new Error("Could not find the author link");
  }

  const authorPseudonym = authorLink.textContent?.trim() ?? "";
  const authorUrlProfile = extractWattpadUsername(authorLink.href);

  // The avatar is in the image that shares container with that <a>
  const avatarImg = authorLink
    .closest("div")
    ?.querySelector<HTMLImageElement>("img");
  const authorUrlCoverProfile = avatarImg?.src;

  return {
    authorPseudonym,
    authorUrlProfile,
    authorUrlCoverProfile,
  };
}

/**
 * Extracts just the pathname from a Wattpad URL
 */
export function extractWattpadUsername(url: string): string {
  return new URL(url).pathname;
}
