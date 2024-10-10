"use client";

import { Accordion, AccordionItem, Image, Button, Link } from "@repo/ui/nextui";
import { useDateFormatter } from "@react-aria/i18n";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import BtnCreateFbPost from "#components/novel/create/btn-create-fb-post";

type ChaptersAccordionProps = {
  chapters: NovelFindBySlugPayload["chapters"];
  platforms: NovelFindBySlugPayload["platforms"];
  template: string | undefined;
  slug: string;
};

export default function ChaptersAccordion({
  chapters,
  platforms,
  template,
  slug,
}: ChaptersAccordionProps): JSX.Element {
  const formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <Accordion
      showDivider={false}
      className="p-2 flex flex-col gap-1"
      variant="bordered"
      itemClasses={{
        base: "py-0",
        title: "text-base text-ellipsis overflow-hidden line-clamp-1",
        subtitle: "text-ellipsis overflow-hidden line-clamp-1",
        trigger:
          "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
      }}
    >
      {chapters.map((chapter) => (
        <AccordionItem
          key={chapter.id}
          aria-label={
            chapter.title.length > 0 ? chapter.title : "Capítulo de la novela"
          }
          startContent={
            chapter.urlCoverChapter ? (
              <Image
                src={chapter.urlCoverChapter}
                alt="Portada del capítulo"
                width={40}
                height={40}
                classNames={{
                  img: "object-cover",
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-lg grid place-items-center font-bold">
                {chapter.title.length > 0
                  ? chapter.title.slice(0, 1).toUpperCase()
                  : "N"}
              </div>
            )
          }
          subtitle={
            chapter.publishedAt ? formatter.format(chapter.publishedAt) : "--"
          }
          title={
            chapter.title.length > 0 ? chapter.title : "Capítulo de la novela"
          }
        >
          <div className="space-y-3">
            <div>
              <label
                htmlFor="urlChapter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL del capítulo
              </label>
              <Link
                id="urlChapter"
                href={platforms.at(0)?.platform.baseUrl + chapter.urlChapter}
                isExternal
                className="break-all"
              >
                {platforms.at(0)?.platform.baseUrl + chapter.urlChapter}
              </Link>
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título del capítulo
              </label>
              <p className="p-2 bg-gray-100 rounded-md text-gray-800">
                {chapter.title}
              </p>
            </div>
            <div>
              <label
                htmlFor="urlCoverChapter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de la portada del capítulo
              </label>
              <p className="p-2 bg-gray-100 rounded-md text-gray-800">
                {chapter.urlCoverChapter || "No disponible"}
              </p>
            </div>
            <div>
              <label
                htmlFor="urlCoverChapter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Publicación de Facebook
              </label>
              {chapter.publication ? (
                <Link
                  href={`/publications/${chapter.publication.id}`}
                  color="primary"
                  className="break-all"
                >
                  Ver publicación
                </Link>
              ) : template ? (
                <BtnCreateFbPost
                  template={template}
                  link={platforms.at(0)?.platform.baseUrl + chapter.urlChapter}
                  slug={slug}
                  chapterId={chapter.id}
                />
              ) : (
                <p className="p-2 bg-orange-100 rounded-md text-gray-800">
                  Antes de crear una publicación, configura la plantilla.
                </p>
              )}
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
