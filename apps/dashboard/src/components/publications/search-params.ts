import { parseAsInteger } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const publicationSearchParams = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
};

export const publicationSearchParamsCache = createSearchParamsCache(
  publicationSearchParams
);
