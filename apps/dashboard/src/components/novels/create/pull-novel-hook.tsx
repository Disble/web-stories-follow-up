"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardBody,
  Link,
  useDisclosure,
  type CalendarDate,
} from "@repo/ui/nextui";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { useDateFormatter } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  createFullNovel,
  findNovelByUrlNovel,
  scrapeNovel,
} from "./pull-novel.action";
import type { PlatformListPayload } from "@repo/layer-prisma/model/platform/platform.interface";
import { PATH_DASHBOARD } from "#routes/index";
import { SolarShieldWarningBoldDuotone } from "@repo/ui/icons";

export const urlSchema = z.string().url("La URL no es válida");
export const urlRelativeSchema = z
  .string()
  .regex(/\/(?:[\w-]+\/)*[\w-]+/, "La URL no es válida");

export const FormSchema = z.object({
  urlNovel: urlSchema,
  title: z.string(),
  synopsis: z.string(),
  note: z.string().optional(),
  urlCoverNovel: urlSchema,
  chapters: z.array(
    z.object({
      title: z.string(),
      urlChapter: urlRelativeSchema,
      urlCoverChapter: urlSchema.optional(),
      publishedAt: z.custom<CalendarDate>().nullable(),
    })
  ),
  authorName: z.string().optional(),
  authorPseudonym: z.string(),
  authorUrlProfile: urlRelativeSchema,
  authorUrlCoverProfile: urlSchema.optional(),
  platform: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

type PullOrCreateNovelProps = {
  platforms: PlatformListPayload[];
};

export default function usePullNovel({ platforms }: PullOrCreateNovelProps) {
  const [isPulling, setIsPulling] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [chapterToDelete, setChapterToDelete] = useState<number>();

  const platformsOptions = platforms.map((platform) => ({
    key: platform.code,
    value: platform.code,
    label: platform.name,
  }));

  const form = useForm<FormData>({
    defaultValues: {
      urlNovel: "",
      title: "",
      synopsis: "",
      urlCoverNovel: "",
      chapters: [],
      authorPseudonym: "",
      authorUrlProfile: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "chapters",
  });

  const handleCheckNovelExists = useCallback(
    async (urlCoverNovel: string) => {
      const novelExists = await findNovelByUrlNovel(urlCoverNovel);

      if ("error" in novelExists) return;

      form.setError("urlNovel", {
        type: "custom",
        message: "Esta novela ya existe",
      });
    },
    [form]
  );

  const urlNovel = form.watch("urlNovel");
  const urlNovelError = urlSchema.safeParse(urlNovel);

  const urlCoverNovel = form.watch("urlCoverNovel");
  const urlCoverNovelError = urlSchema.safeParse(urlCoverNovel);

  const authorUrlCoverProfile = form.watch("authorUrlCoverProfile");
  const authorUrlCoverProfileError = urlSchema.safeParse(authorUrlCoverProfile);

  const formatter = useDateFormatter({ dateStyle: "full" });

  useEffect(() => {
    if (urlNovelError.success) {
      handleCheckNovelExists(urlNovel);
    }
  }, [urlNovelError.success, handleCheckNovelExists, urlNovel]);

  const handlePullNovel = async () => {
    try {
      setIsPulling(true);
      toast.success("Comprobando base de datos...");

      const novelExists = await findNovelByUrlNovel(urlNovel);

      if (!("error" in novelExists)) {
        toast.custom((t) => (
          <Card>
            <CardBody>
              <div className="flex items-center gap-2">
                <SolarShieldWarningBoldDuotone className="size-6 text-warning" />
                <p>
                  Esta novela ya existe, puedes editarla{" "}
                  <Link href={`${PATH_DASHBOARD.novel}/${novelExists.slug}`}>
                    aquí
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        ));
        return;
      }

      toast.success("Descargando datos de la novela...");

      const novelScraped = await scrapeNovel(urlNovel);

      if ("error" in novelScraped) {
        toast.error(novelScraped.error);
        return;
      }

      if (fields.length > 0) {
        remove(); // clean chapters
      }

      let platform = "";

      try {
        platform = new URL(urlNovel).hostname
          .replace(/^www\./, "")
          .split(".")
          .slice(0, -1)
          .join(".");
      } catch (error) {
        toast.error(
          "Tuvimos un error al obtener la plataforma de la novela. Por favor, seleccionala manualmente."
        );
      }

      form.setValue("title", novelScraped.title);
      form.setValue("synopsis", novelScraped.synopsis);
      form.setValue("note", novelScraped.note);
      form.setValue("urlCoverNovel", novelScraped.urlCoverNovel);

      for (const chapter of novelScraped.chapters) {
        append({
          title: chapter.title,
          urlChapter: chapter.urlChapter,
          // @ts-expect-error: Types are compatibles, but CalendarDate is not assignable because is private
          publishedAt: chapter.publishedAt
            ? parseDate(chapter.publishedAt.split("T")[0])
            : null,
        });
      }
      form.setValue("authorName", novelScraped.authorName);
      form.setValue("authorPseudonym", novelScraped.authorPseudonym);
      form.setValue("authorUrlProfile", novelScraped.authorUrlProfile);
      form.setValue(
        "authorUrlCoverProfile",
        novelScraped.authorUrlCoverProfile
      );

      form.setValue("platform", platform);
      toast.success("Datos de la novela descargados correctamente");
    } catch (error) {
      toast.error("Error al descargar los datos de la novela");
    } finally {
      setIsPulling(false);
    }
  };

  const handleAppendChapter = () => {
    append({
      title: "",
      urlChapter: "",
      publishedAt: null,
    });
  };

  const handleWarningDeleteChapter = (index: number) => {
    setChapterToDelete(index);
    onOpen();
  };

  const handleDeleteChapter = () => {
    if (chapterToDelete !== undefined) remove(chapterToDelete);
    onOpenChange();
  };

  const onSubmit = async (values: FormData) => {
    try {
      const platformId = platforms.find(
        (platform) => platform.code === values.platform
      )?.id;

      if (!platformId) {
        toast.error("Por favor, selecciona una plataforma válida.");
        return;
      }

      await createFullNovel({
        title: values.title,
        synopsis: values.synopsis,
        note: values.note,
        urlNovel: values.urlNovel,
        urlCoverNovel: values.urlCoverNovel,
        chapters: {
          createMany: {
            data: values.chapters.map((chapter) => ({
              title: chapter.title,
              urlChapter: chapter.urlChapter,
              urlCoverChapter: chapter.urlCoverChapter,
              publishedAt: chapter.publishedAt
                ?.toDate(getLocalTimeZone())
                ?.toISOString(),
            })),
          },
        },
        authors: {
          create: {
            author: {
              create: {
                name: values.authorName,
                pseudonym: values.authorPseudonym,
                urlProfile: values.authorUrlProfile,
                urlCoverProfile: values.authorUrlCoverProfile,
              },
            },
          },
        },
        platforms: {
          create: {
            platformId,
            isPreferred: true,
          },
        },
      });

      toast.success("Novela creada correctamente");
    } catch (error) {
      toast.error(
        "Error de registro. Por favor, revise los datos e intente nuevamente."
      );
    }
  };

  return {
    form,
    isPulling,
    urlNovelError,
    urlCoverNovel,
    authorUrlCoverProfile,
    urlCoverNovelError,
    authorUrlCoverProfileError,
    formatter,
    handleAppendChapter,
    handlePullNovel,
    handleWarningDeleteChapter,
    handleDeleteChapter,
    onSubmit,
    fields,
    platformsOptions,
    isOpen,
    onOpenChange,
  };
}
