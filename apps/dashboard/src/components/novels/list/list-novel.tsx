import type { PageNumberPaginationMeta } from "@repo/layer-prisma/utils";
import type { NovelCardListPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Tooltip,
} from "@repo/ui/nextui";
import ListNovelPagination from "./list-novel-pagination";
import Link from "next/link";
import { PATH_DASHBOARD } from "#routes/index";
import {
  SolarInfoCircleBoldDuotone,
  SolarShieldWarningBold,
} from "@repo/ui/icons";

interface BinnaclesTableProps {
  novelCards: NovelCardListPayload[];
  pagination: PageNumberPaginationMeta<true>;
}

export default function ListNovel({
  novelCards,
  pagination,
}: BinnaclesTableProps): JSX.Element {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:p-6 p-3">
      {novelCards.map((novel) => {
        return novel.novelPlatforms.map((novelPlatform) => (
          <Card
            key={novelPlatform.id}
            isFooterBlurred
            className="h-[300px] relative"
            shadow="none"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              {!novel.template && (
                <Tooltip
                  content="Novela sin plantilla. No se publicarán nuevos capítulos automáticamente."
                  color="warning"
                >
                  <div className="absolute top-2 right-2">
                    <SolarShieldWarningBold className="size-8 text-amber-500 fill-rose-500 drop-shadow-lg" />
                  </div>
                </Tooltip>
              )}
              <h4 className="text-slate-50/90 font-medium text-xl [text-shadow:0px_0px_3px_rgb(3,3,3)]">
                {novel.title}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              fallbackSrc="https://cdn.dribbble.com/users/27766/screenshots/3488007/media/ac55b16291e99eb1740c17b4ac793454.png"
              alt={`${novel.title} - ${novel.author.pseudonym}`}
              className="z-0 w-full h-full object-cover"
              src={novelPlatform.urlCoverNovel}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                {novel.author.urlCoverProfile ? (
                  <Image
                    alt="Breathing app icon"
                    className="rounded-full size-10 bg-black"
                    src={novel.author.urlCoverProfile}
                    fallbackSrc="https://cdn.dribbble.com/users/27766/screenshots/3488007/media/ac55b16291e99eb1740c17b4ac793454.png"
                  />
                ) : (
                  <div className="rounded-full size-10 bg-gray-100 flex items-center justify-center">
                    <span className="text-black">
                      {novel.author.pseudonym?.charAt(0).toUpperCase() ?? "?"}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">
                    {novel.author.pseudonym}
                  </p>
                  <p className="text-tiny text-white/60">
                    {novelPlatform._count.chapters}{" "}
                    {novelPlatform._count.chapters === 1
                      ? "Capítulo"
                      : "Capítulos"}
                  </p>
                </div>
              </div>
              <Button
                as={Link}
                href={`${PATH_DASHBOARD.novel}/${novel.slug}?platform=${novelPlatform.platform.code}`}
                radius="full"
                size="sm"
              >
                Ver capítulos
              </Button>
            </CardFooter>
          </Card>
        ));
      })}
      <ListNovelPagination pagination={pagination} />
    </section>
  );
}
