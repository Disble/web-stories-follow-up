import type { Prisma } from "@repo/layer-prisma";
import type { extractAllChapters } from "./wattpad-scraper";

export function filterChaptersToUpdate<
  TypeDbChapters extends { urlChapter: string },
>(
  currentScrapedChapters: ReturnType<typeof extractAllChapters>,
  dbChapters: TypeDbChapters[]
) {
  if (currentScrapedChapters.length === 0) {
    return {
      newCurrentScrapedChapters: [],
      toRemoveDbChapters: [],
    };
  }

  const uniqueDbUrlChapters = new Set(
    dbChapters.map((chapter) => chapter.urlChapter)
  );
  const uniqueCurrentChapterUrls = new Set(
    currentScrapedChapters.map((chapter) => chapter.urlChapter)
  );

  const newCurrentScrapedChapters = currentScrapedChapters.filter(
    (chapter) => !uniqueDbUrlChapters.has(chapter.urlChapter)
  );

  const toRemoveDbChapters = dbChapters.filter(
    (dbChapter) => !uniqueCurrentChapterUrls.has(dbChapter.urlChapter)
  );

  return {
    newCurrentScrapedChapters,
    toRemoveDbChapters,
  };
}

type ChapterCreateInput = Pick<
  Prisma.ChapterCreateManyInput,
  "title" | "urlChapter" | "publishedAt" | "isTracking"
>;

type ChapterDeleteInput = {
  id: string;
};

export function mapChaptersToDb<
  T extends ChapterCreateInput,
  U extends ChapterDeleteInput,
>(
  newCurrentScrapedChapters: T[],
  toRemoveDbChapters: U[],
  novelPlatformId: string
) {
  const newCurrentScrapedChaptersToCreate: Prisma.ChapterCreateManyInput[] =
    newCurrentScrapedChapters.map((chapter) => ({
      title: chapter.title,
      urlChapter: chapter.urlChapter,
      publishedAt: chapter.publishedAt,
      novelPlatformId,
      isTracking: true,
    }));

  const toRemoveDbChaptersIds = toRemoveDbChapters.map((chapter) => chapter.id);

  return {
    newCurrentScrapedChaptersToCreate,
    toRemoveDbChaptersIds,
  };
}
