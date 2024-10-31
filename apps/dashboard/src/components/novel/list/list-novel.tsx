"use client";
import { Chip, Image, Link, Tab, Tabs, Tooltip } from "@repo/ui/nextui";
import TemplateUpsert from "#components/novel/edit/template-upsert";
import BtnChaptersUpdate from "#components/novel/update/btn-chapters-update";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import type { PlatformListPayload } from "@repo/layer-prisma/model/platform/platform.interface";
import ChaptersAccordion from "./chapters-accordion";
import { useQueryStates } from "nuqs";
import { novelListSearchParams } from "#components/novels/list/search-params";
import { NovelStatus } from "@repo/layer-prisma";
import CalloutWarning from "#components/commons/callout-warning";
import { useUIStore } from "#store/ui.store";
import { useEffect } from "react";

export type EnumMap<T extends string> = {
  [key in T]: string;
};

const NovelStatusMap = {
  [NovelStatus.ONGOING]: "En curso",
  [NovelStatus.COMPLETE]: "Completada",
  [NovelStatus.CANCELLED]: "Cancelada",
  [NovelStatus.HIATUS]: "En hiato",
  [NovelStatus.DISCONTINUED]: "Descontinuada",
  [NovelStatus.AUTHOR_ISSUES]: "Problemas del autor",
} satisfies EnumMap<NovelStatus>;

type ListNovelProps = {
  novelPlatform: NovelFindBySlugPayload;
  platforms: PlatformListPayload[];
};

export default function ListNovel({
  novelPlatform,
  platforms,
}: ListNovelProps): JSX.Element {
  const [searchParams, setSearchParams] = useQueryStates(
    novelListSearchParams,
    {
      history: "replace",
      shallow: false,
    }
  );
  const platformCode = searchParams.platform;
  const platformTabs = platforms.map((platform) => ({
    id: platform.code,
    label: platform.name,
  }));
  const { setCustomTitle } = useUIStore();

  useEffect(() => {
    setCustomTitle(novelPlatform.novel.title);
  }, [novelPlatform.novel.title, setCustomTitle]);

  return (
    <>
      {novelPlatform.novel.template === null && (
        <CalloutWarning>
          <p className="font-bold">Esta novela no tiene una plantilla</p>
          <p className="text-sm">
            Sin una plantilla, no se puede programar las publicaciones de los
            nuevos capítulos.
          </p>
        </CalloutWarning>
      )}
      <section className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-[100px_minmax(0,1fr)] md:grid-rows-[50px_minmax(0,1fr)] gap-4 pt-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center row-span-1 col-span-2 px-4 gap-4">
          <Tooltip content="El sistema solo hace seguimiento a las novelas en curso">
            <Chip
              variant="dot"
              color={
                novelPlatform.novel.status === NovelStatus.ONGOING
                  ? "success"
                  : "danger"
              }
            >
              <p>{NovelStatusMap[novelPlatform.novel.status]}</p>
            </Chip>
          </Tooltip>
          <Tabs
            aria-label="Options"
            items={platformTabs}
            selectedKey={platformCode}
            onSelectionChange={(key) => {
              setSearchParams({ platform: key as string });
            }}
          >
            {(item) => <Tab key={item.id} title={item.label} />}
          </Tabs>
        </div>
        <section className="row-span-1 col-span-2 md:col-span-1 md:row-span-2">
          <article className="flex flex-col gap-4 p-4 items-center max- w-sm mx-auto">
            <h1 className="text-2xl font-bold">{novelPlatform.novel.title}</h1>
            <Image
              src={novelPlatform.urlCoverNovel}
              alt={novelPlatform.novel.title}
              className="max-w-full h-[400px]"
            />
            <p className="text-lg font-bold w-full text-gray-500">Sinopsis</p>
            <pre className="text-sm text-gray-500 text-justify text-balance w-full font-sans">
              {novelPlatform.novel.synopsis}
            </pre>
            <p className="text-sm text-gray-500 w-full">
              <span className="font-bold">Plataforma:</span>{" "}
              {novelPlatform.platform.name ?? "desconocida"}
            </p>
            <p className="text-sm text-gray-500 w-full">
              <span className="font-bold">Novela:</span>{" "}
              <Link
                href={novelPlatform.urlNovel}
                isExternal
                className="text-sm inline"
              >
                {novelPlatform.urlNovel}
              </Link>
            </p>
            <p className="text-sm text-gray-500 w-full">
              <span className="font-bold">Autor:</span>{" "}
              <Link
                href={novelPlatform.urlAuthorProfile}
                isDisabled={!novelPlatform.urlAuthorProfile}
                isExternal
                className="text-sm inline"
              >
                {novelPlatform.novel.author.pseudonym ?? "desconocido"}
              </Link>
            </p>
          </article>
          <TemplateUpsert
            template={novelPlatform.novel.template?.text ?? ""}
            novelId={novelPlatform.novel.id}
            slug={novelPlatform.novel.slug}
          />
        </section>
        <article className="flex flex-col gap-4 p-4">
          <h2 className="text-xl font-bold flex items-center justify-between gap-2">
            {novelPlatform.chapters.length}{" "}
            {novelPlatform.chapters.length === 1 ? "capítulo" : "capítulos"}
            <BtnChaptersUpdate
              slug={novelPlatform.novel.slug}
              novelId={novelPlatform.id}
              novelUrl={novelPlatform.urlNovel}
              chapters={novelPlatform.chapters}
            />
          </h2>
          <ChaptersAccordion
            chapters={novelPlatform.chapters}
            template={novelPlatform.novel.template?.text}
            slug={novelPlatform.novel.slug}
          />
        </article>
      </section>
    </>
  );
}
