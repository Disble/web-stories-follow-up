import { getPublicationsCalendarData } from "#components/charts/charts-utils";
import CardPublications from "./card-publications";

export default async function CardPublicationApi(): Promise<JSX.Element> {
  const publicationsCalendarData = await getPublicationsCalendarData();

  if (!publicationsCalendarData) {
    return <div>No hay datos</div>;
  }

  return <CardPublications data={publicationsCalendarData} />;
}
