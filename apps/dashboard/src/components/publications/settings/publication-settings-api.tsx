import { db } from "@repo/layer-prisma/db";
import PublicationSettings from "./publication-settings";
import { parameters } from "#lib/consts";

export default async function PublicationSettingsApi(): Promise<JSX.Element> {
  const fbPublicationTime = await db.parameter.getByName(
    parameters.FB_PUBLICATION_TIME
  );

  if (typeof fbPublicationTime === "string" || fbPublicationTime === null) {
    return <>No se ha encontrado el parámetro en la base de datos.</>;
  }

  return <PublicationSettings fbPublicationTime={fbPublicationTime} />;
}
