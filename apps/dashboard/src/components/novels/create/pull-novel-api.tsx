import { db } from "@repo/layer-prisma/db";
import PullOrCreateNovel from "./pull-novel";

export default async function PullNovelApi(): Promise<JSX.Element> {
  const platforms = await db.platform.list();

  if (typeof platforms === "string") {
    return (
      <div>
        No hay plataformas creadas, por favor crea una plataforma para poder
        agregar una novela.
      </div>
    );
  }

  return <PullOrCreateNovel platforms={platforms} />;
}
