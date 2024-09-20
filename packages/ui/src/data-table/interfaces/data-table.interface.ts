import type { SortDescriptor } from "@repo/ui/nextui";

import type { KeysLeaves } from "./utils.interface";

export type DataTableColumns<Row> = Array<{
  key: KeysLeaves<Row> | keyof Row;
  label: string;
  sortable?: boolean;
}>;

export type DataTableRow = {
  id: string | number;
  // biome-ignore lint/suspicious/noExplicitAny: library syntax
  [key: string]: any;
};

export type DataTableSearchParams = {
  page?: number;
  page_size?: number;
  // biome-ignore lint/suspicious/noExplicitAny: library syntax
  [key: string]: any;
};

export type DataTableRenderTopContent<Row> = (
  props: DataTableRenderTopContentProps<Row>
) => JSX.Element;

export type DataTableRenderTopContentProps<Row> = {
  selectedRows: Array<string | number>;
  urlSearchParams: URLSearchParams;
  rows: Array<Row>;
};

export type DataTableRenderCell<Row> = (
  rows: Row,
  columnKey: React.Key
) => React.JSX.Element;

export interface DataTableProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> {
  rows: Array<Row>;
  columns: DataTableColumns<Row>;
  /** Page count of the table by page-limit pagination */
  totalPages: number;
  /** Total count of rows of the table */
  totalCount: number;
  searchParams: SearchParams;
  renderCell: DataTableRenderCell<Row>;
  // recommended
  renderTopContent?: DataTableRenderTopContent<Row>;
  // optionals
  defaultColumnSort?: SortDescriptor;
  selectionMode?: "none" | "single" | "multiple";
  removeWrapper?: boolean;
}
