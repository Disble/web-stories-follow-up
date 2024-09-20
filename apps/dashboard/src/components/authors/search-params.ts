import { parseAsInteger, useQueryStates } from "nuqs";
import { createSearchParamsCache } from "nuqs/parsers";

export const authorSearchParams = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
};

export const authorSearchParamsCache =
  createSearchParamsCache(authorSearchParams);
