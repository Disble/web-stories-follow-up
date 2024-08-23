import { PrismaBuilder } from "./prisma-builder";
import { UserModel } from "@/model/user/user.model";

export class Db extends PrismaBuilder {
  protected baseURL = process.env.BASE_URL ?? "";

  public readonly user: UserModel;

  public constructor() {
    super();

    this.user = new UserModel(this.prisma, this.baseURL);
  }
}
