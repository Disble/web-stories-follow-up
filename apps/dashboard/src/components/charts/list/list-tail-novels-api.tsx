import { getLast10ChaptersAdded } from "#components/charts/charts-utils";
import ListTailNovels from "./list-tail-novels";

export default async function ListTailNovelsApi(): Promise<JSX.Element> {
  const last10ChaptersAdded = await getLast10ChaptersAdded();

  if (!last10ChaptersAdded) {
    return <div>No hay datos</div>;
  }

  return <ListTailNovels chapters={last10ChaptersAdded} />;
}
