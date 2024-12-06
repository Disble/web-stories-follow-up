"use client";

import { type BarLegendProps, ResponsiveBar } from "@nivo/bar";
import { useWindowSize } from "@custom-react-hooks/use-window-size";
import type { LogTimeRange } from "@repo/layer-prisma/model/log/log.interface";

export type DataBarNovelsScraping = Array<{
  key: string;
  "novels-scraping-fulfilled": number;
  "novels-scraping-rejected": number;
}>;

type LogBarScrapingProps = {
  data: DataBarNovelsScraping;
  timeRange: LogTimeRange;
};

export default function LogBarScraping({
  data,
  timeRange,
}: LogBarScrapingProps): JSX.Element {
  const { width } = useWindowSize();
  const isTablet = width < 1024;

  const legendsDesktop: BarLegendProps = {
    data: [
      {
        id: "novels-scraping-fulfilled",
        label: "Exitosa",
        color: "#14b8a6",
      },
      {
        id: "novels-scraping-rejected",
        label: "Fallida",
        color: "#f43f5e",
      },
    ],
    dataFrom: "keys",
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: "left-to-right",
    itemOpacity: 0.85,
    symbolSize: 20,
    effects: [
      {
        on: "hover",
        style: {
          itemOpacity: 1,
        },
      },
    ],
  };
  const legends: BarLegendProps[] = isTablet
    ? [
        {
          ...legendsDesktop,
          direction: "row",
          anchor: "bottom",
          translateX: 25,
          translateY: 60,
        },
      ]
    : [legendsDesktop];

  const margin = isTablet
    ? { top: 10, right: 0, bottom: 70, left: 0 }
    : { top: 50, right: 130, bottom: 50, left: 60 };

  return (
    <ResponsiveBar
      data={data}
      keys={["novels-scraping-fulfilled", "novels-scraping-rejected"]}
      indexBy="key"
      margin={margin}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#14b8a6", "#f43f5e"]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 32,
        truncateTickAt: 0,
        tickValues: data.map((v, i) => {
          if (timeRange === "last-7-days") return v.key;
          if (timeRange === "last-14-days") return i % 2 === 0 ? v.key : "";
          if (timeRange === "last-1-month") return i % 7 === 0 ? v.key : "";
          if (timeRange === "last-3-months") return i % 14 === 0 ? v.key : "";

          return "";
        }),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "novelas analizadas",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 100]],
      }}
      label={(e) => {
        return `${Math.abs(e.value ?? 0)}`;
      }}
      legends={legends}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in country: ${e.data["novels-scraping-fulfilled"]}`
      }
      tooltip={({ id, value, indexValue }) => (
        <div className="rounded-md bg-white p-2 shadow-md backdrop-blur-sm border border-gray-100">
          <div className="flex items-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                id === "novels-scraping-fulfilled"
                  ? "bg-teal-500"
                  : "bg-rose-500"
              }`}
            />
            <span className="text-xs font-medium">
              {id === "novels-scraping-fulfilled" ? "Exitosas" : "Fallidas"}
              <span className="ml-1 font-bold">{Math.abs(value)}</span>
            </span>
          </div>
          <span className="mt-0.5 block text-xs text-gray-700">
            {indexValue}
          </span>
        </div>
      )}
    />
  );
}
