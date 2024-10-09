import { db } from "@repo/layer-prisma/db";
import { userSearchParamsCache } from "#components/user/search-params";
import ListUsers from "./list-users";
import { SessionError } from "@repo/types/utils/errors";

export default async function ListUsersApi(): Promise<JSX.Element> {
  const { page, page_size } = userSearchParamsCache.all();
  const [users, pagination] = await db.user.listPaginated({
    page,
    limit: page_size,
  });

  if (users instanceof SessionError || pagination === null) {
    return <div>No users found</div>;
  }

  return <ListUsers users={users} pagination={pagination} />;
}
