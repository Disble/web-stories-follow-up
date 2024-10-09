import ListPlatformApi from "#components/platforms/list/list-platform-api";
import { platformSearchParamsCache } from "#components/platforms/search-params";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  platformSearchParamsCache.parse(searchParams);
  return <ListPlatformApi />;
}
