import { FetchApi } from "#abstract-factory/fetch-api.abstract";
import { env } from "@repo/env-config/env-global";
import { getPageAccessTokenResponseSchema } from "./account.interface";
import { queryParse } from "#utils";

export class AccountModel extends FetchApi {
  public async getPageAccessToken({
    isPublic = false,
  }: {
    isPublic?: boolean;
  } = {}) {
    const response = await this.fetch(
      `/me/accounts${queryParse({
        access_token: env.FB_ACCESS_TOKEN,
      })}`,
      getPageAccessTokenResponseSchema,
      {
        method: "GET",
      },
      {
        isPublic,
      }
    );

    return response;
  }
}
