import ListUsersApi from "#components/user/list/list-users-api";
import { userSearchParamsCache } from "#components/user/search-params";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  userSearchParamsCache.parse(searchParams);

  return <ListUsersApi />;
}
