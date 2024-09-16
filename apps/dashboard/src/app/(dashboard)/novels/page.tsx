import ListNovelApi from "#components/novels/list/list-novel-api";

export type NovelSearchParams = {
  page?: string;
  page_size?: string;
};

type NovelPageProps = {
  searchParams: NovelSearchParams;
};

export default function Page({ searchParams }: NovelPageProps): JSX.Element {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="mx-auto mb-14 mt-6 flex w-full max-w-[95rem] flex-col gap-4 px-6">
        {/* <BinnaclesBreadcrumbs /> */}

        <div className="mx-auto w-full max-w-[95rem]">
          <ListNovelApi searchParams={searchParams} />
        </div>
      </div>
    </section>
  );
}
