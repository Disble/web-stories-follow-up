"use client";

import type { NovelSearchParams } from "#app/(dashboard)/novels/page";
import DataTable, {
  type DataTableColumns,
  type DataTableRenderCell,
} from "@repo/ui/data-table";
import type { NovelCardListPayload } from "@repo/layer-prisma/model/novel/novel.interface";

const columns: DataTableColumns<NovelCardListPayload> = [
  { key: "title", label: "Título" },
  { key: "synopsis", label: "Sinopsis" },
  { key: "urlCoverNovel", label: "URL de la portada" },
  { key: "urlNovel", label: "URL del libro" },
];

interface BinnaclesTableProps {
  novels: NovelCardListPayload[];
  searchParams: NovelSearchParams;
  totalCount: number;
  totalPages: number;
}

export default function ListNovel({
  novels,
  searchParams,
  totalCount,
  totalPages,
}: BinnaclesTableProps): JSX.Element {
  const renderCell: DataTableRenderCell<NovelCardListPayload> = (
    novel,
    columnKey
  ) => {
    const novelKey = columnKey as keyof NovelCardListPayload;

    switch (novelKey) {
      case "title" || "synopsis" || "urlCoverNovel" || "urlNovel":
        return <span>{novel[novelKey]}</span>;
      default:
        return <span>{novel[novelKey]}</span>;
    }
  };

  return (
    <DataTable
      rows={novels}
      columns={columns}
      totalCount={totalCount}
      totalPages={totalPages}
      searchParams={searchParams}
      renderCell={renderCell}
    />
  );
}
