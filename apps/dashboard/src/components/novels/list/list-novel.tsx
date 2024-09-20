"use client";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import type { NovelCardListPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Pagination,
} from "@repo/ui/nextui";
import { useQueryStates } from "nuqs";
import { novelSearchParams } from "#components/novels/search-params";

interface BinnaclesTableProps {
  novels: NovelCardListPayload[];
  pagination: PageNumberPaginationMeta<true>;
}

export default function ListNovel({
  novels,
  pagination,
}: BinnaclesTableProps): JSX.Element {
  const [searchParams, setSearchParams] = useQueryStates(novelSearchParams, {
    history: "push",
    shallow: false,
  });

  const handleOnChangePage = (page: number) => {
    setSearchParams({ page, page_size: searchParams.page_size });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-6 p-3">
      {novels.map((novel) => (
        <Card
          key={novel.id}
          isFooterBlurred
          className="h-[300px]"
          shadow="none"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              {novel._count.chapters}{" "}
              {novel._count.chapters === 1 ? "Capítulo" : "Capítulos"}
            </p>
            <h4 className="text-white/90 font-medium text-xl">{novel.title}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={novel.urlCoverNovel}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">
                  {novel.authors
                    .map((author) => author.author.pseudonym)
                    .join(", ")}
                </p>
              </div>
            </div>
            <Button radius="full" size="sm">
              Ver novela
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-center col-span-full">
        <Pagination
          showControls
          color="primary"
          variant="bordered"
          page={pagination.currentPage}
          total={pagination.pageCount}
          onChange={handleOnChangePage}
          isDisabled={pagination.totalCount === 0}
        />
      </div>
    </section>
  );
}
