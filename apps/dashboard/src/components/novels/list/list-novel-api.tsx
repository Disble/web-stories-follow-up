import { z } from "zod";

import { parseSchemaOrDefault } from "#lib/params-stringify";

import type { NovelSearchParams } from "#app/(dashboard)/novels/page";
import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";
import ListNovel from "./list-novel";
import NotFoundDataTable from "#components/commons/not-found-data-table";

const numberSchema = z.coerce.number();

type ListNovelApiProps = {
  searchParams: NovelSearchParams;
};

export default async function ListNovelApi({
  searchParams,
}: ListNovelApiProps): Promise<JSX.Element> {
  const [novels, pagination] = await db.novel.cardsList({
    page: parseSchemaOrDefault(searchParams.page, numberSchema, 1),
    limit: parseSchemaOrDefault(searchParams.page_size, numberSchema, 10),
  });

  if (novels instanceof SessionError || pagination === null) {
    return <div>No users found</div>;
  }

  return (
    <>
      {novels && novels.length > 0 ? (
        <ListNovel
          novels={novels}
          searchParams={searchParams}
          totalCount={pagination.totalCount}
          totalPages={pagination.pageCount}
        />
      ) : (
        <NotFoundDataTable />
      )}
    </>
  );
}
