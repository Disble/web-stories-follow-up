import { AuthorModel } from "#model/author/author.model";
import { ChapterModel } from "#model/chapter/chapter.model";
import { NovelModel } from "#model/novel/novel.model";
import { UserModel } from "#model/user/user.model";
import { PlatformModel } from "#model/platform/platform.model";
import { PrismaAuthMiddleware } from "./prisma-auth-middleware";
import { TemplateModel } from "#model/template/template.model";
import { ParameterModel } from "#model/parameter/parameter.model";
import { PublicationModel } from "#model/publication/publication.model";
import { LogModel } from "#model/log/log.model";

export class ModelFactory extends PrismaAuthMiddleware {
  public readonly user: UserModel;
  public readonly novel: NovelModel;
  public readonly author: AuthorModel;
  public readonly chapter: ChapterModel;
  public readonly platform: PlatformModel;
  public readonly template: TemplateModel;
  public readonly parameter: ParameterModel;
  public readonly publication: PublicationModel;
  public readonly log: LogModel;

  public constructor() {
    super();

    this.user = new UserModel(this.connect, this);
    this.novel = new NovelModel(this.connect, this);
    this.author = new AuthorModel(this.connect, this);
    this.chapter = new ChapterModel(this.connect, this);
    this.platform = new PlatformModel(this.connect, this);
    this.template = new TemplateModel(this.connect, this);
    this.parameter = new ParameterModel(this.connect, this);
    this.publication = new PublicationModel(this.connect, this);
    this.log = new LogModel(this.connect, this);
  }
}
