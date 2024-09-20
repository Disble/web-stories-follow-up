import ListNovelApi from "#components/novels/list/list-novel-api";
import { novelSearchParamsCache } from "#components/novels/search-params";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  novelSearchParamsCache.parse(searchParams);
  return <ListNovelApi />;
}
