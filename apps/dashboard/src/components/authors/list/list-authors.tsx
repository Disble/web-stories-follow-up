"use client";
import type { AuthorListPayload } from "@repo/layer-prisma/model/author/author.interface";
import DataTable, {
  type DataTableColumns,
  type DataTableRenderCell,
} from "@repo/ui/data-table";
import { useQueryStates } from "nuqs";
import { authorSearchParams } from "#components/authors/search-params";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import { Image } from "@repo/ui/nextui";

const columns: DataTableColumns<AuthorListPayload> = [
  { key: "name", label: "Nombre" },
  { key: "pseudonym", label: "Pseudónimo" },
  { key: "urlCoverProfile", label: "URL de la imagen de perfil" },
];

type ListAuthorsProps = {
  authors: AuthorListPayload[];
  pagination: PageNumberPaginationMeta<true>;
};

export default function ListAuthors({
  authors,
  pagination,
}: ListAuthorsProps): JSX.Element {
  const [searchParams] = useQueryStates(authorSearchParams);
  const renderCell: DataTableRenderCell<AuthorListPayload> = (
    author,
    columnKey
  ) => {
    const authorKey = columnKey as keyof AuthorListPayload;

    switch (authorKey) {
      case "name":
        return <span>{author[authorKey]}</span>;
      case "pseudonym":
        return <span>{author[authorKey]}</span>;
      case "urlCoverProfile":
        return <Image src={author[authorKey] ?? ""} alt="Imagen de perfil" />;
      default:
        return <span>{author[authorKey]}</span>;
    }
  };

  return (
    <DataTable
      rows={authors}
      columns={columns}
      totalCount={pagination.totalCount}
      totalPages={pagination.pageCount}
      searchParams={searchParams}
      renderCell={renderCell}
    />
  );
}
