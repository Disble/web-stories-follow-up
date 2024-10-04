import { parseAsInteger } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const novelSearchParams = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(6),
};

export const novelSearchParamsCache =
  createSearchParamsCache(novelSearchParams);
