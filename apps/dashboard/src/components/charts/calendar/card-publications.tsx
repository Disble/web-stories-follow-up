"use client";

import {
  Card,
  CardBody,
  CardHeader,
  SelectItem,
  type SharedSelection,
} from "@repo/ui/nextui";
import { Select } from "@repo/ui/nextui";
import PublicationsCalendar, {
  type PublicationsCalendarData,
} from "./publications-calendar";
import { useState } from "react";
import { getPublicationsCalendarData } from "#components/charts/charts-utils";
import type { PublicationTimeRange } from "@repo/layer-prisma/model/publication/publication.interface";

const extractTimeRange = (
  key: SharedSelection
): PublicationTimeRange | null => {
  const value = Array.from(key)[0] as string;
  return ["last-3-months", "last-6-months", "last-12-months"].includes(value)
    ? (value as PublicationTimeRange)
    : null;
};

type CardPublicationsProps = {
  data: PublicationsCalendarData[];
};

export default function CardPublications({
  data,
}: CardPublicationsProps): JSX.Element {
  const [dataChart, setDataChart] = useState<PublicationsCalendarData[]>(data);
  const [timeRange, setTimeRange] =
    useState<PublicationTimeRange>("last-3-months");

  return (
    <Card className="border-1" shadow="none">
      <CardHeader className="flex items-center justify-between gap-x-2">
        <h3 className="md:text-lg font-semibold">Capítulos publicados</h3>
        <div>
          <Select
            aria-label="Time Range"
            classNames={{
              trigger: "min-w-[100px] min-h-7 h-7",
              value: "text-tiny !text-default-500",
              selectorIcon: "text-default-500",
              popoverContent: "min-w-[120px]",
            }}
            defaultSelectedKeys={["last-3-months"]}
            listboxProps={{
              itemClasses: {
                title: "text-tiny",
              },
            }}
            onSelectionChange={async (key) => {
              const timeRange = extractTimeRange(key);
              if (!timeRange) return;

              const newData = await getPublicationsCalendarData({
                timeRange,
              });

              if (newData !== null) {
                setDataChart(newData);
                setTimeRange(timeRange);
              }
            }}
            placeholder="3 meses"
            size="sm"
          >
            <SelectItem key="last-3-months">3 meses</SelectItem>
            <SelectItem key="last-6-months">6 meses</SelectItem>
            <SelectItem key="last-12-months">12 meses</SelectItem>
          </Select>
        </div>
      </CardHeader>
      <CardBody className="h-full max-h-[25svh] md:max-h-[45svh] min-w-0 col-span-1 row-start-2">
        <PublicationsCalendar data={dataChart} timeRange={timeRange} />
      </CardBody>
    </Card>
  );
}
