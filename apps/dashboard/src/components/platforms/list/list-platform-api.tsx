import { db } from "@repo/layer-prisma/db";
import { platformSearchParamsCache } from "../search-params";
import ListPlatforms from "./list-platforms";
import { SessionError } from "@repo/types/utils/errors";

export default async function ListPlatformApi(): Promise<JSX.Element> {
  const { page, page_size } = platformSearchParamsCache.all();
  const [platforms, pagination] = await db.platform.listPaginated({
    page,
    limit: page_size,
  });

  if (platforms instanceof SessionError || pagination === null) {
    return <div>No platforms found</div>;
  }

  return <ListPlatforms platforms={platforms} pagination={pagination} />;
}
