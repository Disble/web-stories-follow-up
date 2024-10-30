import NotFoundDataTable from "#components/commons/not-found-data-table";
import ListNovel from "#components/novel/list/list-novel";
import { novelListSearchParamsCache } from "#components/novels/list/search-params";
import { db } from "@repo/layer-prisma/db";
import { Link } from "@repo/ui/nextui";

type PageProps = {
  params: { slug: string };
  searchParams: { platform: string };
};

export default async function Page({
  params,
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { platform: platformCode } =
    novelListSearchParamsCache.parse(searchParams);
  const platforms = await db.platform.listBySlug(params.slug);

  if (typeof platforms === "string" || platforms.length === 0) {
    return <div>Ninguna plataforma encontrada</div>;
  }

  const novel = await db.novel.findBySlugAndPlatform(
    params.slug,
    platformCode ?? platforms[0].code
  );

  if (typeof novel === "string" || novel === null) {
    return (
      <div className="flex flex-col items-center gap-4">
        <NotFoundDataTable />
        <Link href="/novels">Volver a la lista de novelas</Link>
      </div>
    );
  }

  return <ListNovel novelPlatform={novel} platforms={platforms} />;
}
