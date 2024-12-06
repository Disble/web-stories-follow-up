import { getSevenDaysAgoTickValues } from "#components/charts/charts-utils";
import CardLogBarScraping from "./card-log-bar-scraping";

export default async function CardLogBarScrapingApi(): Promise<JSX.Element> {
  const sevenDaysAgoScraping = await getSevenDaysAgoTickValues();

  if (!sevenDaysAgoScraping) {
    return <div>No hay datos</div>;
  }

  return <CardLogBarScraping data={sevenDaysAgoScraping} />;
}
