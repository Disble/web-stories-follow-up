import { db } from "@repo/layer-prisma/db";
import { authorSearchParamsCache } from "#components/authors/search-params";
import ListAuthors from "./list-authors";
import { SessionError } from "@repo/types/utils/errors";

export default async function ListAuthorApi(): Promise<JSX.Element> {
  const { page, page_size } = authorSearchParamsCache.all();
  const [authors, pagination] = await db.author.listPaginated({
    page,
    limit: page_size,
  });

  if (authors instanceof SessionError || pagination === null) {
    return <div>No authors found</div>;
  }

  return <ListAuthors authors={authors} pagination={pagination} />;
}
