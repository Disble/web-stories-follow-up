import { UserModel } from "#model/user/user.model";
import { PrismaAuthMiddleware } from "./prisma-auth-middleware";

export class ModelFactory extends PrismaAuthMiddleware {
  public readonly user: UserModel;

  public constructor() {
    super();

    this.user = new UserModel(this.connect, this);
  }
}
