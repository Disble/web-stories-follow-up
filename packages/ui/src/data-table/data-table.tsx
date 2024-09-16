import {
  type Selection,
  type SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@repo/ui/nextui";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useDtRenderBottomContent from "./hooks/use-dt-render-bottom-content";
import useDtRenderTopContent from "./hooks/use-dt-render-top-content";
import type {
  DataTableProps,
  DataTableRow,
  DataTableSearchParams,
} from "./interfaces/data-table.interface";

export default function DataTable<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({
  rows,
  columns,
  totalPages,
  totalCount,
  searchParams,
  renderCell,
  // recommended
  renderTopContent,
  // optionals
  defaultColumnSort = { column: "id", direction: "descending" },
  selectionMode = "none",
  removeWrapper = false,
}: DataTableProps<Row, SearchParams>): JSX.Element {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const [sortDescriptor, setSortDescriptor] =
    useState<SortDescriptor>(defaultColumnSort);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const pathname = usePathname();
  const { replace } = useRouter();

  const { topContent } = useDtRenderTopContent({
    renderTopContent,
    selectedRows,
    urlSearchParams,
    rows,
    totalCount,
    pathname,
    replace,
  });

  const { bottomContent } = useDtRenderBottomContent({
    searchParams,
    totalPages,
    rows,
    selectedKeys,
    selectionMode,
    pathname,
    urlSearchParams,
    replace,
  });

  const handleOnSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
    if (keys === "all") {
      setSelectedRows(rows.map((row) => row.id));
      return;
    }
    setSelectedRows(Array.from(keys));
  };

  const sortedItems = useMemo(() => {
    return [...rows].sort((a: Row, b: Row) => {
      const first = a[sortDescriptor.column as keyof Row] as number;
      const second = b[sortDescriptor.column as keyof Row] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, rows]);

  return (
    <Table
      removeWrapper={removeWrapper}
      aria-label="Table with dynamic content"
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      onSelectionChange={handleOnSelectionChange}
      topContent={topContent}
      bottomContent={bottomContent}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key as string | number} // NOTE: DataTableRow only supports string | number
            allowsSorting={!!column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems} emptyContent={"Sin datos disponibles"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell
                  ? renderCell(item, columnKey)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
