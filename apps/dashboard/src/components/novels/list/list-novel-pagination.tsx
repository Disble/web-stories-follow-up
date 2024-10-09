"use client";

import { useQueryStates } from "nuqs";
import { novelSearchParams } from "#components/novels/search-params";
import { Pagination, Button } from "@repo/ui/nextui";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";

interface ListNovelPaginationProps {
  pagination: PageNumberPaginationMeta<true>;
}

export default function ListNovelPagination({
  pagination,
}: ListNovelPaginationProps): JSX.Element {
  const [searchParams, setSearchParams] = useQueryStates(novelSearchParams, {
    history: "push",
    shallow: false,
  });

  const handleOnChangePage = (page: number) => {
    setSearchParams({ page, page_size: searchParams.page_size });
  };

  return (
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
  );
}
