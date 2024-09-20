import ListAuthorApi from "#components/authors/list/list-author-api";
import { authorSearchParamsCache } from "#components/authors/search-params";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  authorSearchParamsCache.parse(searchParams);

  return <ListAuthorApi />;
}
