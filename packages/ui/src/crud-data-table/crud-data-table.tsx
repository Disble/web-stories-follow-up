import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@repo/ui/nextui";
import type { JSX } from "react";

import DataTable, {
  type DataTableRenderCell,
  type DataTableRow,
  type DataTableSearchParams,
} from "#data-table";
import {
  SolarMenuDotsBold,
  SolarPenOutline,
  SolarTrashBinTrashOutline,
} from "#icons";

import useCDTModal from "./hooks/use-cdt-modal";
import useCDTRenderTopContent from "./hooks/use-cdt-render-top-content";
import type { CrudDataTableProps } from "./interfaces/crud-data-table.interface";

export default function CrudDataTable<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({
  rows,
  columns,
  totalPages,
  totalCount,
  searchParams,
  onEditUrl,
  urlCreate,
  // optionals recommended
  renderCell,
  renderTopContentBody,
  // optionals
  defaultColumnSort,
  isDeleteMultipleActive = true,
  isDeleteRowActive = true,
  onDeleteRow,
  isDateRangeActive = false,
  onChangeDateRange,
  dateRangeURLParams,
  renderDeleteModalBody,
  removeWrapper = false,
  selectionMode = "multiple",
}: CrudDataTableProps<Row, SearchParams>): JSX.Element {
  // states
  const columnsWithActions = [...columns, { key: "actions", label: "" }];

  // hooks
  const { Modal, openDeleteModal, onOpen } = useCDTModal({
    renderDeleteModalBody,
    onDeleteRow,
  });
  const { renderTopContent } = useCDTRenderTopContent({
    renderTopContentBody,
    isDateRangeActive,
    urlCreate,
    onChangeDateRange,
    dateRangeURLParams,
    isDeleteMultipleActive,
    onOpen,
    searchParams,
  });

  const renderCellWrapper: DataTableRenderCell<Row> = (row, columnKey) => {
    const rowKey = columnKey as keyof Row;

    if (!isDeleteRowActive && rowKey === "actions") {
      return (
        <div className="relative flex items-center justify-end gap-2">
          <Dropdown className="border-1 border-default-200 bg-background">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <SolarMenuDotsBold className="size-5 text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <Link
                  color="foreground"
                  href={onEditUrl(row.id, row)}
                  className="flex items-center gap-2"
                >
                  <SolarPenOutline className="size-4" />
                  <span className="text-medium font-normal">Editar</span>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }

    if (isDeleteRowActive && rowKey === "actions") {
      return (
        <div className="relative flex items-center justify-end gap-2">
          <Dropdown className="border-1 border-default-200 bg-background">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <SolarMenuDotsBold className="size-5 text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <Link
                  color="foreground"
                  href={onEditUrl(row.id, row)}
                  className="flex items-center gap-2"
                >
                  <SolarPenOutline className="size-4" />
                  <span className="text-medium font-normal">Editar</span>
                </Link>
              </DropdownItem>
              <DropdownItem color="danger" onPress={() => openDeleteModal(row)}>
                <div className="flex items-center gap-2">
                  <SolarTrashBinTrashOutline className="size-4" />
                  <span className="text-medium font-normal">Eliminar</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }

    return renderCell(row, columnKey);
  };

  return (
    <>
      <DataTable
        rows={rows}
        columns={columnsWithActions}
        totalPages={totalPages}
        totalCount={totalCount}
        searchParams={searchParams}
        renderCell={renderCellWrapper}
        removeWrapper={removeWrapper}
        selectionMode={selectionMode}
        renderTopContent={renderTopContent}
        defaultColumnSort={defaultColumnSort}
      />
      <Modal />
    </>
  );
}
