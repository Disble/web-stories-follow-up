export type LogTimeRange =
  | "last-7-days"
  | "last-14-days"
  | "last-1-month"
  | "last-3-months";

export type LogListOptions = {
  timeRange?: LogTimeRange;
};
