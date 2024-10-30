import { db } from "@repo/layer-prisma/db";
import PullOrCreateNovel from "./pull-novel";

export default async function PullNovelApi(): Promise<JSX.Element> {
  const platforms = await db.platform.list();
  const authors = await db.author.list();

  if (typeof platforms === "string") {
    return (
      <div>
        No hay plataformas creadas, por favor crea una plataforma para poder
        agregar una novela.
      </div>
    );
  }

  return (
    <PullOrCreateNovel
      platforms={platforms}
      // we use an empty array instead type guard because the workflow
      // can't be blocked by the authors list
      authors={typeof authors === "string" ? [] : authors}
    />
  );
}
