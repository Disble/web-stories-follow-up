import { env } from "@repo/env-config/env-global";
import { FetchApiMiddleware } from "#factory/fetch-api-middleware";
import { FeedModel } from "#model/feed/feed.model";
import { AccountModel } from "#model/account/account.model";

export class ModelFactory extends FetchApiMiddleware {
  protected baseURL = env.FB_API_BASE_URL;

  public readonly feed: FeedModel;
  public readonly account: AccountModel;

  public constructor() {
    super();

    this.feed = new FeedModel(this.fetch, this.baseURL, this);
    this.account = new AccountModel(this.fetch, this.baseURL, this);
  }
}
