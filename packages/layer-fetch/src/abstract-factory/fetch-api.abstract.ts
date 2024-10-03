import type { FetchType } from "./fetch-api.interface";

export abstract class FetchApi {
  public constructor(
    protected readonly fetch: FetchType,
    protected baseURL: string
  ) {}
}
