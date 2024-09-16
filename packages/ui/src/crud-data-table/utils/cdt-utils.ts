import type { CrudDataTableOnChangeDateRange } from "#crud-data-table";

export const hofOnChangeDateRange = (
  dateGte: string,
  dateLte: string
): CrudDataTableOnChangeDateRange => {
  const onChangeDateRange: CrudDataTableOnChangeDateRange = (
    dateRange,
    urlSearchParams,
    pathname,
    replace
  ) => {
    if (!dateRange) {
      urlSearchParams.delete(dateGte);
      urlSearchParams.delete(dateLte);
      urlSearchParams.set("page", String(1));
      replace(`${pathname}?${urlSearchParams.toString()}`, {
        scroll: false,
      });
      return;
    }

    if (!dateRange.start || !dateRange.end) return;

    urlSearchParams.set(dateGte, dateRange.start.toString());
    urlSearchParams.set(dateLte, dateRange.end.toString());
    urlSearchParams.set("page", String(1));
    replace(`${pathname}?${urlSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return onChangeDateRange;
};
