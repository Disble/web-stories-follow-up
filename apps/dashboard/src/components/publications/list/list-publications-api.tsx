import { db } from "@repo/layer-prisma/db";
import { publicationSearchParamsCache } from "#components/publications/search-params";
import ListPublications from "./list-publications";
import { SessionError } from "@repo/types/utils/errors";
import NotFoundDataTable from "#components/commons/not-found-data-table";

export default async function ListPublicationsApi(): Promise<JSX.Element> {
  const { page, page_size } = publicationSearchParamsCache.all();
  const [publications, pagination] = await db.publication.listPaginated({
    page,
    limit: page_size,
  });

  if (publications instanceof SessionError || pagination === null) {
    return <NotFoundDataTable />;
  }

  return (
    <ListPublications publications={publications} pagination={pagination} />
  );
}
