import { FetchApi } from "#abstract-factory/fetch-api.abstract";
import {
  feedPublishPostResponseSchema,
  type FeedPublishPostBody,
} from "./feed.interface";

export class FeedModel extends FetchApi {
  public async publishPost(pageId: string, body: FeedPublishPostBody) {
    const response = await this.fetch(
      `/${pageId}/feed`,
      feedPublishPostResponseSchema,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    return response;
  }
}
