import { PrismaDirector } from "@/director/prisma-director";

export class UserModel extends PrismaDirector {
  public async getMe() {
    return this.prisma.user.findFirst();
  }

  public async getUsers({ page, limit }: { page: number; limit: number }) {
    return this.prisma.user.paginate({
      select: {
        id: true,
        name: true,
      },
    }).withPages({
      page,
      limit,
      includePageCount: true,
    });
  }
}
