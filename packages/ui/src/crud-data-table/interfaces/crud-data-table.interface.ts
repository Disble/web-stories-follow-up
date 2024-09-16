import type { DateValue } from "@react-types/datepicker";
import type { RangeValue } from "@react-types/shared";
import type { JSX } from "react";

import type {
  DataTableProps,
  DataTableRenderTopContentProps,
  DataTableRow,
  DataTableSearchParams,
  NavigateOptions,
} from "#data-table";

export type CrudDataTableRenderDeleteModalBody<T> = (row: T) => {
  header?: JSX.Element;
  body: JSX.Element;
};

export type CrudDateTableDateRange = RangeValue<DateValue>;

export type CrudDataTableOnChangeDateRange = (
  dateRange: CrudDateTableDateRange,
  urlSearchParams: URLSearchParams,
  pathname: string,
  replace: (href: string, options?: NavigateOptions | undefined) => void
) => void;

export type CrudDataTableRenderTopBody<Row> = (
  props: DataTableRenderTopContentProps<Row>
) => {
  left?: JSX.Element;
  right?: JSX.Element;
};

export type CrudDataTableDateRangeURLParams = {
  dateGte: string;
  dateLte: string;
};

export interface CrudDataTableProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> extends DataTableProps<Row, SearchParams> {
  onEditUrl: (id: string | number, row: Row) => string;
  urlCreate?: string;
  onDeleteRow?:
    | ((id: string | number) => void)
    | ((id: string | number) => Promise<void>);
  renderDeleteModalBody?: CrudDataTableRenderDeleteModalBody<Row>;
  renderTopContentBody?: CrudDataTableRenderTopBody<Row>;
  isDateRangeActive?: boolean;
  isDeleteMultipleActive?: boolean;
  isDeleteRowActive?: boolean;
  onChangeDateRange?: CrudDataTableOnChangeDateRange;
  dateRangeURLParams?: CrudDataTableDateRangeURLParams;
}
