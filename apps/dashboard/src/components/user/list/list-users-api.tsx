import { db } from "@repo/layer-prisma/db";
import { userSearchParamsCache } from "#components/user/search-params";
import ListUsers from "./list-users";
import { SessionError } from "@repo/types/utils/errors";
import NotFoundDataTable from "#components/commons/not-found-data-table";
import { redirect } from "next/navigation";
import { PATH_DASHBOARD } from "#routes/index";

export default async function ListUsersApi(): Promise<JSX.Element> {
  const { page, page_size } = userSearchParamsCache.all();
  const [users, pagination] = await db.user.listPaginated({
    page,
    limit: page_size,
  });

  if (users instanceof SessionError) {
    redirect(PATH_DASHBOARD.root);
  }

  if (users.length === 0 || pagination === null) {
    return <NotFoundDataTable />;
  }

  return <ListUsers users={users} pagination={pagination} />;
}
