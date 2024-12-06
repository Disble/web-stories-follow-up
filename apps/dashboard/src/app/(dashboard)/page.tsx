import CardLogBarScrapingApi from "#components/charts/bars/card-log-bar-scraping-api";
import CardPublicationApi from "#components/charts/calendar/card-publication-api";
import { Suspense } from "react";
import { Skeleton } from "@repo/ui/nextui";
import ListTailNovelsApi from "#components/charts/list/list-tail-novels-api";

export default function Page(): JSX.Element {
  return (
    <div className="grid grid-cols-1 grid-rows-[300px_350px_1fr] lg:grid-rows-none gap-4 p-2 md:p-5 lg:grid-cols-[3fr_1fr]">
      <Suspense
        fallback={
          <Skeleton className="w-full h-full max-h-[25svh] md:max-h-[45svh] min-w-0 col-span-1 row-start-2 rounded-lg" />
        }
      >
        <CardPublicationApi />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton className="w-full h-full max-h-[40svh] min-w-0 col-span-1 row-start-1 rounded-lg" />
        }
      >
        <CardLogBarScrapingApi />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton className="w-full h-[70svh] rounded-lg col-span-1 row-start-3 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-2" />
        }
      >
        <div className="col-span-1 row-start-3 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-2">
          <ListTailNovelsApi />
        </div>
      </Suspense>
    </div>
  );
}
