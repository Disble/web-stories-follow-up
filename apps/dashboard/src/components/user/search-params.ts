import { parseAsInteger } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const userSearchParams = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
};

export const userSearchParamsCache = createSearchParamsCache(userSearchParams);
