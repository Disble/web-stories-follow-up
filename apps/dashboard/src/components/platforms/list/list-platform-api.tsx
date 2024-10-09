import { db } from "@repo/layer-prisma/db";
import { platformSearchParamsCache } from "../search-params";
import ListPlatforms from "./list-platforms";
import { SessionError } from "@repo/types/utils/errors";
import NotFoundDataTable from "#components/commons/not-found-data-table";
import { PATH_DASHBOARD } from "#routes/index";
import { redirect } from "next/navigation";

export default async function ListPlatformApi(): Promise<JSX.Element> {
  const { page, page_size } = platformSearchParamsCache.all();
  const [platforms, pagination] = await db.platform.listPaginated({
    page,
    limit: page_size,
  });

  if (platforms instanceof SessionError) {
    redirect(PATH_DASHBOARD.root);
  }

  if (platforms.length === 0 || pagination === null) {
    return <NotFoundDataTable />;
  }

  return <ListPlatforms platforms={platforms} pagination={pagination} />;
}
