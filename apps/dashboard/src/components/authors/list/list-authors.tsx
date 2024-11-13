"use client";
import type { AuthorListPayload } from "@repo/layer-prisma/model/author/author.interface";
import DataTable, {
  type KeysLeaves,
  type DataTableColumns,
  type DataTableRenderCell,
} from "@repo/ui/data-table";
import { useQueryStates } from "nuqs";
import { authorSearchParams } from "#components/authors/search-params";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import { Link, User } from "@repo/ui/nextui";
import { SimpleDateFormatCell } from "@repo/ui/simple-components";

const columns: DataTableColumns<AuthorListPayload> = [
  { key: "name", label: "Nombre" },
  { key: "_count.novels", label: "Plataformas" },
  { key: "createdAt", label: "Agregado" },
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
    const authorKey = columnKey as KeysLeaves<AuthorListPayload>;

    switch (authorKey) {
      case "name": {
        const optionalName = author.name ? ` (${author.name})` : "";
        return (
          <User
            name={`${author.pseudonym}${optionalName}`}
            description={`${author._count?.novels} ${author._count?.novels === 1 ? "novela" : "novelas"}`}
            avatarProps={{
              src: author.urlCoverProfile ?? "",
            }}
          />
        );
      }
      case "_count.novels": {
        const uniquePlatforms = author.novels.reduce<{
          [key: string]: { name: string; urlAuthorProfile: string };
        }>((acc, novel) => {
          for (const novelPlatform of novel.novelPlatforms) {
            if (!acc[novelPlatform.platform.id]) {
              acc[novelPlatform.platform.id] = {
                name: novelPlatform.platform.name,
                urlAuthorProfile: novelPlatform.urlAuthorProfile ?? "#",
              };
            }
          }
          return acc;
        }, {});
        return (
          <div className="flex gap-2">
            {Object.entries(uniquePlatforms).map(([id, platform]) => (
              <Link
                href={platform.urlAuthorProfile}
                isExternal
                key={id}
                showAnchorIcon
              >
                {platform.name}
              </Link>
            ))}
          </div>
        );
      }
      case "createdAt": {
        return <SimpleDateFormatCell date={author.createdAt} />;
      }
      default:
        return <span />;
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
