import type { z } from "zod";

export type FetchType = <TValues>(
  url: string,
  schema: z.Schema<TValues>,
  config: RequestInit,
  isLoggedIn?: boolean
) => Promise<FetchResponse<TValues>>;

export type FetchResponse<TValues> = Prettify<
  [Prettify<FetchDataResponse<TValues>>, FetchError]
>;

type FetchDataResponse<TValues> = TValues | null;

type FetchError = unknown;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
