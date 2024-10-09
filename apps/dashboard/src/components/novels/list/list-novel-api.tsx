import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";
import ListNovel from "./list-novel";
import NotFoundDataTable from "#components/commons/not-found-data-table";
import { novelSearchParamsCache } from "#components/novels/search-params";

export default async function ListNovelApi(): Promise<JSX.Element> {
  const { page, page_size } = novelSearchParamsCache.all();
  const [novels, pagination] = await db.novel.cardsList({
    page,
    limit: page_size,
  });

  if (novels instanceof SessionError || pagination === null) {
    return <div>No hay novelas registradas</div>;
  }

  return (
    <>
      {novels.length > 0 ? (
        <ListNovel novels={novels} pagination={pagination} />
      ) : (
        <NotFoundDataTable />
      )}
    </>
  );
}
