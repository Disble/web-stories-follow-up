import { parseDate } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import { Button, DateRangePicker, type DateValue, Link } from "@repo/ui/nextui";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { CrudDataTableProps } from "#crud-data-table";
import { hofOnChangeDateRange } from "#crud-data-table";
import type {
  DataTableRenderTopContent,
  DataTableRow,
  DataTableSearchParams,
} from "#data-table";
import { SolarTrashBinTrashOutline, TablerPlus } from "#icons";

type UseCDTRenderTopContentProps<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
> = {
  onOpen: () => void;
} & Pick<
  CrudDataTableProps<Row, SearchParams>,
  | "dateRangeURLParams"
  | "renderTopContentBody"
  | "isDateRangeActive"
  | "isDeleteMultipleActive"
  | "isDeleteRowActive"
  | "onChangeDateRange"
  | "searchParams"
  | "urlCreate"
>;

export default function useCDTRenderTopContent<
  Row extends DataTableRow,
  SearchParams extends DataTableSearchParams,
>({
  renderTopContentBody,
  isDateRangeActive,
  onChangeDateRange,
  dateRangeURLParams,
  isDeleteMultipleActive,
  onOpen,
  searchParams,
  urlCreate,
}: UseCDTRenderTopContentProps<Row, SearchParams>) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [date, setDate] = useState<RangeValue<DateValue>>();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    if (dateRangeURLParams?.dateGte && dateRangeURLParams?.dateLte) {
      const dateGte = urlSearchParams.get(dateRangeURLParams.dateGte);
      const dateLte = urlSearchParams.get(dateRangeURLParams.dateLte);

      if (!dateGte || !dateLte) return;

      setDate({
        // @ts-expect-error: Types are compatibles, but CalendarDate is not assignable to DateValue because is private
        start: parseDate(dateGte),
        // @ts-expect-error: Types are compatibles, but CalendarDate is not assignable to DateValue because is private
        end: parseDate(dateLte),
      });
    }

    return () => {
      setDate(undefined);
    };
  }, [
    dateRangeURLParams?.dateGte,
    dateRangeURLParams?.dateLte,
    urlSearchParams,
  ]);

  const handleOnRangeDatePickerChange = useCallback(
    (dateRange: RangeValue<DateValue>, urlSearchParams: URLSearchParams) => {
      setDate(dateRange);
      if (onChangeDateRange) {
        onChangeDateRange(dateRange, urlSearchParams, pathname, replace);
      } else if (
        dateRangeURLParams?.dateGte &&
        dateRangeURLParams.dateGte !== "" &&
        dateRangeURLParams?.dateLte &&
        dateRangeURLParams.dateLte !== ""
      ) {
        const handlerChangeDateRange = hofOnChangeDateRange(
          dateRangeURLParams.dateGte,
          dateRangeURLParams.dateLte
        );
        handlerChangeDateRange(dateRange, urlSearchParams, pathname, replace);
      } else {
        throw new Error(
          "dateRangeURLParams or onChangeDateRange is not defined"
        );
      }
    },
    [dateRangeURLParams, onChangeDateRange, pathname, replace]
  );

  const renderTopContent: DataTableRenderTopContent<Row> = (props) => {
    const { selectedRows, urlSearchParams } = props;
    return (
      <div className="flex items-end justify-between gap-3">
        {renderTopContentBody && !!renderTopContentBody(props).left ? (
          renderTopContentBody(props).left
        ) : (
          <div />
        )}
        <div className="flex gap-3">
          {!!renderTopContentBody &&
            !!renderTopContentBody(props).right &&
            renderTopContentBody(props).right}
          {isDateRangeActive && (
            <div className="grid gap-2">
              <DateRangePicker
                aria-label="Date Range Picker"
                visibleMonths={2}
                pageBehavior="single"
                value={date}
                onChange={(value) => {
                  handleOnRangeDatePickerChange(value, urlSearchParams);
                }}
              />
            </div>
          )}
          {urlCreate && (
            <Button
              as={Link}
              color="primary"
              endContent={<TablerPlus className="size-4" />}
              href={urlCreate}
            >
              Crear nuevo
            </Button>
          )}
          {isDeleteMultipleActive && (
            <Button
              color="danger"
              isDisabled={selectedRows.length === 0}
              onPress={() => onOpen()}
              isIconOnly
            >
              <SolarTrashBinTrashOutline className="size-4 text-background" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return { renderTopContent };
}
