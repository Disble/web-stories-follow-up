import { Button, Pagination, type Selection } from "@repo/ui/nextui";
import { useCallback, useMemo } from "react";

import type {
  DataTableProps,
  DataTableRow,
  DataTableSearchParams,
  NavigateOptions,
} from "..";

type UseDtRenderBottomContentProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> = {
  selectedKeys: Selection;
  urlSearchParams: URLSearchParams;
  pathname: string;
  replace: (href: string, options?: NavigateOptions | undefined) => void;
} & Pick<
  DataTableProps<Row, SearchParams>,
  "searchParams" | "totalPages" | "rows" | "selectionMode"
>;

export default function useDtRenderBottomContent<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({
  searchParams,
  totalPages,
  rows,
  selectedKeys,
  selectionMode,
  pathname,
  urlSearchParams,
  replace,
}: UseDtRenderBottomContentProps<Row, SearchParams>) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      urlSearchParams.set("page", String(page + 1));
      replace(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
    }
  }, [page, pathname, replace, totalPages, urlSearchParams]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      urlSearchParams.set("page", String(page - 1));
      replace(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
    }
  }, [page, pathname, replace, urlSearchParams]);

  const handleOnChagePage = useCallback(
    (page: number) => {
      urlSearchParams.set("page", String(page));
      replace(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
    },
    [pathname, replace, urlSearchParams]
  );

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="hidden w-[30%] text-small text-default-400 sm:block">
          {selectionMode === "none"
            ? `${rows.length} filas por página`
            : selectedKeys === "all"
              ? "Todos las filas seleccionadas"
              : `${selectedKeys.size} de ${rows.length} filas seleccionadas`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={handleOnChagePage}
          isDisabled={totalPages === 0}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={page === totalPages || totalPages === 0}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [
    selectionMode,
    selectedKeys,
    rows.length,
    page,
    totalPages,
    handleOnChagePage,
    onPreviousPage,
    onNextPage,
  ]);

  return {
    bottomContent,
  };
}
