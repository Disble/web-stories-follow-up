import { db } from "@repo/layer-prisma/db";
import { Image, Link } from "@repo/ui/nextui";
import ChaptersAccordion from "#components/novels/chapters-accordion";

type PageProps = {
  params: { slug: string };
};

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const novel = await db.novel.findBySlug(params.slug);

  if (typeof novel === "string" || novel === null) {
    return <div>{novel}</div>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-2xl mx-auto">
      <article className="flex flex-col gap-4 p-4 items-center max-w-sm mx-auto">
        <h1 className="text-2xl font-bold">{novel.title}</h1>
        <Image
          src={novel.urlCoverNovel}
          alt={novel.title}
          className="max-w-full h-auto"
        />
        <p className="text-lg font-bold w-full text-gray-500">Sinopsis</p>
        <p className="text-sm text-gray-500 text-justify">{novel.synopsis}</p>
        <p className="text-sm text-gray-500 w-full">
          <span className="font-bold">Plataforma:</span>{" "}
          {novel.platforms.at(0)?.platform.name ?? "desconocida"}
        </p>
        <p className="text-sm text-gray-500 w-full">
          <span className="font-bold">Novela:</span>{" "}
          <Link
            href={novel.urlNovel}
            target="_blank"
            className="text-sm inline"
          >
            {novel.urlNovel}
          </Link>
        </p>
        <p className="text-sm text-gray-500 w-full">
          <span className="font-bold">Autor:</span>{" "}
          {/* TODO: add link to author page */}
          {novel.authors.at(0)?.author.pseudonym ?? "desconocido"}
        </p>
      </article>
      <article className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">
          {novel.chapters.length}{" "}
          {novel.chapters.length === 1 ? "capítulo" : "capítulos"}
        </h2>
        <ChaptersAccordion
          chapters={novel.chapters}
          platforms={novel.platforms}
        />
      </article>
    </section>
  );
}
