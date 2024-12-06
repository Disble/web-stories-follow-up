"use client";

import {
  Card,
  CardBody,
  CardHeader,
  SelectItem,
  type SharedSelection,
} from "@repo/ui/nextui";
import { Select } from "@repo/ui/nextui";
import LogBarScraping, { type DataBarNovelsScraping } from "./log-bar-scraping";
import { useState } from "react";
import type { LogTimeRange } from "@repo/layer-prisma/model/log/log.interface";
import { getSevenDaysAgoTickValues } from "../charts-utils";

const extractTimeRange = (key: SharedSelection): LogTimeRange | null => {
  const value = Array.from(key)[0] as string;
  return [
    "last-7-days",
    "last-14-days",
    "last-1-month",
    "last-3-months",
  ].includes(value)
    ? (value as LogTimeRange)
    : null;
};

type CardLogBarScrapingProps = {
  data: DataBarNovelsScraping;
};

export default function CardLogBarScraping({
  data,
}: CardLogBarScrapingProps): JSX.Element {
  const [dataChart, setDataChart] = useState<DataBarNovelsScraping>(data);
  const [timeRange, setTimeRange] = useState<LogTimeRange>("last-7-days");
  return (
    <Card className="border-1" shadow="none">
      <CardHeader className="flex items-center justify-between gap-x-2">
        <h3 className="md:text-lg font-semibold">Extracción de datos</h3>
        <div>
          <Select
            aria-label="Time Range"
            classNames={{
              trigger: "min-w-[100px] min-h-7 h-7",
              value: "text-tiny !text-default-500",
              selectorIcon: "text-default-500",
              popoverContent: "min-w-[120px]",
            }}
            defaultSelectedKeys={["last-7-days"]}
            listboxProps={{
              itemClasses: {
                title: "text-tiny",
              },
            }}
            onSelectionChange={async (key) => {
              const timeRange = extractTimeRange(key);
              if (!timeRange) return;

              const newData = await getSevenDaysAgoTickValues({
                timeRange,
              });

              if (newData !== null) {
                setDataChart(newData);
                setTimeRange(timeRange);
              }
            }}
            placeholder="Últimos 7 días"
            size="sm"
          >
            <SelectItem key="last-7-days">7 días</SelectItem>
            <SelectItem key="last-14-days">14 días</SelectItem>
            <SelectItem key="last-1-month">1 mes</SelectItem>
            <SelectItem key="last-3-months">3 meses</SelectItem>
          </Select>
        </div>
      </CardHeader>
      <CardBody className="h-full max-h-[40svh] min-w-0 col-span-1 row-start-1">
        <LogBarScraping data={dataChart} timeRange={timeRange} />
      </CardBody>
    </Card>
  );
}
