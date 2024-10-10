import ListPublicationsApi from "#components/publications/list/list-publications-api";
import { publicationSearchParamsCache } from "#components/publications/search-params";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  publicationSearchParamsCache.parse(searchParams);

  return <ListPublicationsApi />;
}
