"use client";

import type { PlatformListPayload } from "@repo/layer-prisma/model/platform/platform.interface";
import DataTable, {
  type DataTableColumns,
  type DataTableRenderCell,
} from "@repo/ui/data-table";
import { useQueryStates } from "nuqs";
import { platformSearchParams } from "#components/platforms/search-params";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";

type ListPlatformsProps = {
  platforms: PlatformListPayload[];
  pagination: PageNumberPaginationMeta<true>;
};

const columns: DataTableColumns<PlatformListPayload> = [
  { key: "name", label: "Nombre" },
  { key: "code", label: "Código" },
  { key: "baseUrl", label: "URL" },
  { key: "urlCover", label: "URL de la portada" },
];

export default function ListPlatforms({
  platforms,
  pagination,
}: ListPlatformsProps): JSX.Element {
  const [searchParams] = useQueryStates(platformSearchParams);
  const renderCell: DataTableRenderCell<PlatformListPayload> = (
    platform,
    columnKey
  ) => {
    const platformKey = columnKey as keyof PlatformListPayload;

    switch (platformKey) {
      case "name":
      case "baseUrl":
      case "urlCover":
      case "code":
        return <span>{platform[platformKey]}</span>;
      default:
        return <span>{platform[platformKey]}</span>;
    }
  };

  return (
    <DataTable
      rows={platforms}
      columns={columns}
      totalCount={pagination.totalCount}
      totalPages={pagination.pageCount}
      searchParams={searchParams}
      renderCell={renderCell}
    />
  );
}
