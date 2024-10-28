"use client";
import type { PublicationListPayload } from "@repo/layer-prisma/model/publication/publication.interface";
import DataTable, {
  type DataTableColumns,
  type DataTableRenderCell,
  type KeysLeaves,
} from "@repo/ui/data-table";
import { useQueryStates } from "nuqs";
import { publicationSearchParams } from "#components/publications/search-params";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import { Link } from "@repo/ui/nextui";
import {
  SimpleActiveChipCell,
  SimpleDateFormatCell,
  SimpleTextCell,
  SimpleTooltipCell,
} from "@repo/ui/simple-components";

const columns: DataTableColumns<PublicationListPayload> = [
  { key: "chapter.novelPlatform.novel.slug", label: "Novela" },
  { key: "publishedFacebook", label: "Estado" },
  { key: "idPublishedFacebook", label: "ID Publicación" },
  { key: "scheduledPublishTime", label: "Fecha de publicación programada" },
  { key: "message", label: "Mensaje de la publicación" },
  { key: "link", label: "Link del capítulo" },
  { key: "createdAt", label: "Fecha de creación" },
];

type ListPublicationsProps = {
  publications: PublicationListPayload[];
  pagination: PageNumberPaginationMeta<true>;
};

export default function ListPublications({
  publications,
  pagination,
}: ListPublicationsProps): JSX.Element {
  const [searchParams] = useQueryStates(publicationSearchParams);
  const renderCell: DataTableRenderCell<PublicationListPayload> = (
    publication,
    columnKey
  ) => {
    const publicationKey = columnKey as KeysLeaves<PublicationListPayload>;

    switch (publicationKey) {
      case "idPublishedFacebook": {
        if (publication[publicationKey] === null) {
          return <span>N/A</span>;
        }

        return <SimpleTextCell text={publication[publicationKey]} />;
      }
      case "message":
        return <SimpleTooltipCell text={publication[publicationKey]} />;
      case "link": {
        if (publication[publicationKey] === null) {
          return <span>N/A</span>;
        }

        return (
          <Link href={publication[publicationKey]} isExternal>
            Abrir en {publication.chapter.novelPlatform.platform.name}
          </Link>
        );
      }
      case "chapter.novelPlatform.novel.slug": {
        if (publication.chapter.novelPlatform.novel.slug === null) {
          return <span>N/A</span>;
        }

        return (
          <Link
            href={`/novel/${publication.chapter.novelPlatform.novel.slug}`}
            isExternal
          >
            Abrir novela
          </Link>
        );
      }
      case "publishedFacebook": {
        return (
          <SimpleActiveChipCell
            active={publication[publicationKey]}
            variant="dot"
            options={{
              active: "Publicado",
              inactive: "No publicado",
            }}
          />
        );
      }
      case "scheduledPublishTime": {
        if (publication[publicationKey] === null) {
          return <span>N/A</span>;
        }

        return (
          <SimpleDateFormatCell
            date={new Date(publication[publicationKey] * 1000)}
          />
        );
      }
      case "status": {
        return <SimpleTextCell text={publication[publicationKey]} />;
      }
      case "createdAt": {
        return (
          <SimpleDateFormatCell date={publication[publicationKey]} withTime />
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <DataTable
      rows={publications}
      columns={columns}
      totalCount={pagination.totalCount}
      totalPages={pagination.pageCount}
      searchParams={searchParams}
      renderCell={renderCell}
    />
  );
}
