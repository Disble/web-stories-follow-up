import { useCallback, useMemo } from "react";

import type {
  DataTableProps,
  DataTableRenderTopContentProps,
  DataTableRow,
  DataTableSearchParams,
  NavigateOptions,
} from "..";

type UseDtRenderTopContentProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> = {
  selectedRows: DataTableRenderTopContentProps<Row>["selectedRows"];
  urlSearchParams: URLSearchParams;
  pathname: string;
  replace: (href: string, options?: NavigateOptions | undefined) => void;
} & Pick<
  DataTableProps<Row, SearchParams>,
  "renderTopContent" | "rows" | "totalCount"
>;

export default function useDtRenderTopContent<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({
  renderTopContent,
  selectedRows,
  urlSearchParams,
  rows,
  totalCount,
  pathname,
  replace,
}: UseDtRenderTopContentProps<Row, SearchParams>) {
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      urlSearchParams.set("page", String(1));
      urlSearchParams.set("page_size", e.target.value);
      replace(`${pathname}?${urlSearchParams.toString()}`, { scroll: false });
    },
    [pathname, replace, urlSearchParams]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {renderTopContent?.({ selectedRows, urlSearchParams, rows })}
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {totalCount} en total
          </span>
          <label className="flex items-center text-small text-default-400">
            Filas por página:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
              defaultValue={10}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    renderTopContent,
    selectedRows,
    urlSearchParams,
    rows,
    totalCount,
    onRowsPerPageChange,
  ]);

  return {
    topContent,
  };
}
