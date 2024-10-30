import { parseAsString } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const novelListSearchParams = {
  platform: parseAsString,
};

export const novelListSearchParamsCache = createSearchParamsCache(
  novelListSearchParams
);
