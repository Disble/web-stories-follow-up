import type { ModelFactory } from "#factory/model.factory";
import type { FetchType } from "./fetch-api.interface";

export abstract class FetchApi {
  public constructor(
    protected readonly fetch: FetchType,
    protected baseURL: string,
    protected api: ModelFactory
  ) {}
}
