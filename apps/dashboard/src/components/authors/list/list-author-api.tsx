import { db } from "@repo/layer-prisma/db";
import { authorSearchParamsCache } from "#components/authors/search-params";
import ListAuthors from "./list-authors";
import { SessionError } from "@repo/types/utils/errors";
import NotFoundDataTable from "#components/commons/not-found-data-table";

export default async function ListAuthorApi(): Promise<JSX.Element> {
  const { page, page_size } = authorSearchParamsCache.all();
  const [authors, pagination] = await db.author.listPaginated({
    page,
    limit: page_size,
  });

  if (authors instanceof SessionError || pagination === null) {
    return <NotFoundDataTable />;
  }

  return <ListAuthors authors={authors} pagination={pagination} />;
}
