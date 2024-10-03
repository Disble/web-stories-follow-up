import { FetchApi } from "#abstract-factory/fetch-api.abstract";
import { env } from "@repo/env-config/env-global";
import {
  feedPublishPostResponseSchema,
  type FeedPublishPostBody,
} from "./feed.interface";

export class FeedModel extends FetchApi {
  public async publishPost(body: FeedPublishPostBody) {
    const response = await this.fetch(
      `/${env.FB_PAGE_ID}/feed`,
      feedPublishPostResponseSchema,
      {
        method: "POST",
        body: JSON.stringify({
          ...body,
          // TODO: get the page token middleware
          access_token: "here-is-the-page-token",
        }),
      }
    );
    return response;
  }
}
