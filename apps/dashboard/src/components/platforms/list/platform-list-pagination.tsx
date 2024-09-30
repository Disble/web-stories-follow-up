"use client";

import { useQueryStates } from "nuqs";
import { platformSearchParams } from "#components/platforms/search-params";
import { Pagination } from "@repo/ui/nextui";
import { useRouter } from "next/navigation";
import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";

interface PlatformListPaginationProps {
  pagination: PageNumberPaginationMeta<true>;
}

export default function PlatformListPagination({
  pagination,
}: PlatformListPaginationProps): JSX.Element {
  const [searchParams, setSearchParams] = useQueryStates(platformSearchParams, {
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
