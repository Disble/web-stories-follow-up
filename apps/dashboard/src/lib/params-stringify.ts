import type { z } from "zod";

export function paramsStringify(params: Record<string, unknown>): string {
  const paramsStringify = JSON.parse(JSON.stringify(params));
  const searchParams = new URLSearchParams(paramsStringify);
  return searchParams.toString();
}

export function queryParse(query: Record<string, unknown> | undefined): string {
  return query ? `?${paramsStringify(query)}` : "";
}

/**
 * Calculate page size for pagination
 * @param dataTotalCount
 * @param pageSize
 * @returns
 */
export const calcTotalPages = (
  dataTotalCount: number,
  pageSize: number
): number => {
  return Math.ceil(dataTotalCount / pageSize);
};

export const parseSchemaOrDefault = <TValue, DValue>(
  value: string | undefined,
  schema: z.Schema<TValue>,
  defaultValue: DValue
): DValue | TValue => {
  if (!value) return defaultValue;
  const parsed = schema.safeParse(value);
  return parsed.success ? parsed.data : defaultValue;
};
