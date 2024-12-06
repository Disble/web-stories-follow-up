"use client";

import type { CalendarLegendProps } from "@nivo/calendar";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { useMemo } from "react";
import { addMonth, monthEnd, monthStart } from "@formkit/tempo";
import type { PublicationTimeRange } from "@repo/layer-prisma/model/publication/publication.interface";
import { useWindowSize } from "@custom-react-hooks/use-window-size";

export type PublicationsCalendarData = {
  value: number;
  day: string;
};

type PublicationsCalendarProps = {
  data: PublicationsCalendarData[];
  timeRange: PublicationTimeRange;
};

export default function PublicationsCalendar({
  data,
  timeRange,
}: PublicationsCalendarProps) {
  const { width } = useWindowSize();
  const isTablet = width < 1024;
  const [threeMonthsAgo, thisMonth] = useMemo(() => {
    const today = new Date();

    const months: Record<PublicationTimeRange, number> = {
      "last-3-months": 3,
      "last-6-months": 6,
      "last-12-months": 12,
    };

    const endOfMonth = monthEnd(today);
    const xMonthsAgo = monthStart(addMonth(today, -months[timeRange]));

    return [xMonthsAgo, endOfMonth];
  }, [timeRange]);

  const legendsDesktop: CalendarLegendProps = {
    anchor: "right",
    direction: "column",
    justify: false,
    itemCount: 3,
    itemWidth: 42,
    itemHeight: 36,
    itemsSpacing: 8,
    itemDirection: "top-to-bottom",
    translateX: 0,
    translateY: -60,
    symbolSize: 20,
  };

  const legends: CalendarLegendProps[] = isTablet
    ? [
        {
          ...legendsDesktop,
          direction: "row",
          anchor: "bottom",
          itemDirection: "right-to-left",
          translateY: -36,
        },
      ]
    : [legendsDesktop];

  const margin = isTablet
    ? { top: 40, right: 0, bottom: 40, left: 0 }
    : { top: 40, right: 48, bottom: 40, left: 0 };

  return (
    <ResponsiveTimeRange
      data={data}
      from={threeMonthsAgo}
      to={thisMonth}
      firstWeekday="monday"
      weekdayTicks={[0, 2, 4, 6]}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#e8c1a0", "#f47560"]}
      margin={margin}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={legends}
      tooltip={({ day, value }) => (
        <div className="flex flex-col gap-1 rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur-md border border-gray-100/20 transition-all">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-gray-900">{day}</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {value} publications
          </span>
        </div>
      )}
    />
  );
}
