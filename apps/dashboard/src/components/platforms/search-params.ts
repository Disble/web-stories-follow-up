import { parseAsInteger, useQueryStates } from "nuqs";
import { createSearchParamsCache } from "nuqs/parsers";

export const platformSearchParams = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
};

export const platformSearchParamsCache =
  createSearchParamsCache(platformSearchParams);
