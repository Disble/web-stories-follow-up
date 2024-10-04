import { FetchApi } from "#abstract-factory/fetch-api.abstract";
import { env } from "@repo/env-config/env-global";
import {
  feedPublishPostResponseSchema,
  type FeedPublishPostBody,
} from "./feed.interface";

export class FeedModel extends FetchApi {
  public async publishPost(body: FeedPublishPostBody) {
    const [pageAccessToken] = await this.api.account.getPageAccessToken();

    if (!pageAccessToken || !pageAccessToken?.data[0].access_token) {
      return [null, new Error("Page access token not found")] as const;
    }

    const response = await this.fetch(
      `/${env.FB_PAGE_ID}/feed`,
      feedPublishPostResponseSchema,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...body,
          access_token: pageAccessToken?.data[0].access_token,
        }),
      }
    );
    return response;
  }
}
