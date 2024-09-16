"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionItem,
  Button,
  DatePicker,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
  type CalendarDate,
} from "@repo/ui/nextui";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { FormInput, FormSection, FormTextarea } from "@repo/ui/form";
import { SolarCloudDownloadLinear } from "@repo/ui/icons";
import { SolarTrashBinTrashOutline } from "#components/icons/index";
import { useDateFormatter } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { createFullNovel } from "./pull-novel.action";
import { ChapterStatus } from "@repo/layer-prisma";

const urlSchema = z.string().url("La URL de la novela no es válida");

const FormSchema = z.object({
  urlNovel: urlSchema,
  title: z.string(),
  synopsis: z.string(),
  note: z.string(),
  urlCoverNovel: urlSchema,
  chapters: z.array(
    z.object({
      title: z.string(),
      urlChapter: urlSchema,
      urlCoverChapter: urlSchema,
      publishedAt: z.custom<CalendarDate>().nullable(),
      status: z.nativeEnum(ChapterStatus),
    })
  ),
  authorName: z.string(),
  authorPseudonym: z.string(),
  authorUrlProfile: urlSchema,
});

type FormData = z.infer<typeof FormSchema>;

export default function PullOrCreateNovel(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [chapterToDelete, setChapterToDelete] = useState<number>();

  const form = useForm<FormData>({
    defaultValues: {
      urlNovel: "",
      title: "",
      synopsis: "",
      note: "",
      urlCoverNovel: "",
      chapters: [],
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "chapters",
  });

  const urlNovel = form.watch("urlNovel");
  const urlNovelError = urlSchema.safeParse(urlNovel);

  const urlCoverNovel = form.watch("urlCoverNovel");
  const urlCoverNovelError = urlSchema.safeParse(urlCoverNovel);

  const formatter = useDateFormatter({ dateStyle: "full" });

  const handlePullNovel = async () => {
    try {
      setIsPulling(true);
      toast.success("Descargando datos de la novela...");

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // clean chapters
      if (fields.length > 0) {
        fields.forEach((_, index) => remove(index));
      }

      form.setValue("title", "Mi novela");
      form.setValue("synopsis", "Sinopsis de mi novela");
      form.setValue("note", "Nota de mi novela");
      form.setValue(
        "urlCoverNovel",
        "https://img.wattpad.com/cover/324398974-512-k859929.jpg"
      );
      append({
        title: "Capítulo 1",
        urlChapter:
          "https://www.wattpad.com/1277859900-10-000-roentgens-capítulo-1-mareas-cambiantes",
        urlCoverChapter:
          "https://img.wattpad.com/story_parts/1277859900/images/171e6dffce91cf47538086341392.png",
        publishedAt: today(getLocalTimeZone()),
        status: ChapterStatus.COMPLETED,
      });
      form.setValue("authorName", "Juan Pérez");
      form.setValue("authorPseudonym", "Juancho");
      form.setValue("authorUrlProfile", "https://www.wattpad.com/juanperez");
      toast.success("Datos de la novela descargados correctamente");
    } catch (error) {
      toast.error("Error al descargar los datos de la novela");
    } finally {
      setIsPulling(false);
    }
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
      setIsLoading(true);

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
              publishedAt:
                chapter.publishedAt
                  ?.toDate(getLocalTimeZone())
                  ?.toISOString() ?? new Date(),
              status: chapter.status,
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
              },
            },
          },
        },
      });

      toast.success("Novela creada correctamente");
    } catch (error) {
      toast.error(
        "Error de registro. Por favor, revise los datos e intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormSection
            title="URL de la novela"
            description="Ingresa la URL de la novela que deseas descargar."
          >
            <div className="flex flex-row gap-4 items-start">
              <FormInput
                control={form.control}
                name="urlNovel"
                id="urlNovel"
                label="URL"
                placeholder="https://www.wattpad.com/123456789-mi-novela"
                variant="bordered"
                color="primary"
              />
              <Tooltip content="Descargar datos de la novela">
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    type="submit"
                    isDisabled={!urlNovelError.success}
                    isLoading={isPulling}
                    isIconOnly
                    onPress={handlePullNovel}
                  >
                    <SolarCloudDownloadLinear className="size-5 text-default-500" />
                  </Button>
                </div>
              </Tooltip>
            </div>
          </FormSection>

          <FormSection
            title="Datos de la novela"
            description="Ingresa los datos de la novela que deseas descargar."
          >
            <FormInput
              control={form.control}
              name="title"
              id="title"
              label="Título"
              placeholder="Título de la novela"
              variant="bordered"
              color="primary"
            />
            <FormTextarea
              control={form.control}
              name="synopsis"
              id="synopsis"
              label="Sinopsis"
              placeholder="Sinopsis de la novela"
              variant="bordered"
              color="primary"
            />
            <FormTextarea
              control={form.control}
              name="note"
              id="note"
              label="Nota"
              placeholder="Nota de la novela"
              variant="bordered"
              color="primary"
            />
            <FormInput
              control={form.control}
              name="urlCoverNovel"
              id="urlCoverNovel"
              label="URL de la portada"
              placeholder="https://www.wattpad.com/123456789-mi-novela"
              variant="bordered"
              color="primary"
            />
            {urlCoverNovelError.success && (
              <Image
                src={urlCoverNovel}
                alt="Portada de la novela"
                classNames={{
                  img: "object-cover w-40 h-40",
                }}
              />
            )}
          </FormSection>

          <FormSection
            title="Capítulos"
            description="Ingresa los capítulos de la novela."
          >
            {fields.length > 0 && (
              <Accordion
                showDivider={false}
                className="p-2 flex flex-col gap-1"
                variant="bordered"
                itemClasses={{
                  base: "py-0",
                  title: "font-normal text-medium",
                  trigger:
                    "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                  indicator: "text-medium",
                  content: "text-small px-2",
                }}
              >
                {fields.map((field, index) => {
                  const chapterTitle = form.watch(`chapters.${index}.title`);
                  const urlCoverChapter = form.watch(
                    `chapters.${index}.urlCoverChapter`
                  );
                  const isValidUrlCoverChapter =
                    urlSchema.safeParse(urlCoverChapter);

                  const publishedAt = form.watch(
                    `chapters.${index}.publishedAt`
                  );

                  return (
                    <AccordionItem
                      key={field.id}
                      aria-label={
                        chapterTitle.length > 0
                          ? chapterTitle
                          : "Capítulo de la novela"
                      }
                      startContent={
                        isValidUrlCoverChapter.success ? (
                          <Image
                            src={urlCoverChapter}
                            alt="Portada de la novela"
                            width={40}
                            height={40}
                            classNames={{
                              img: "object-cover",
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-lg grid place-items-center font-bold">
                            {chapterTitle.length > 0
                              ? chapterTitle.slice(0, 1).toUpperCase()
                              : "N"}
                          </div>
                        )
                      }
                      subtitle={
                        <p className="flex">
                          {publishedAt
                            ? formatter.format(
                                publishedAt.toDate(getLocalTimeZone())
                              )
                            : "--"}
                        </p>
                      }
                      title={
                        chapterTitle.length > 0
                          ? chapterTitle
                          : "Capítulo de la novela"
                      }
                    >
                      <div className="space-y-3" key={field.id}>
                        <Input
                          {...form.register(
                            `chapters.${index}.urlChapter` as const
                          )}
                          placeholder="URL del capítulo"
                          label="URL del capítulo"
                        />
                        <Input
                          {...form.register(`chapters.${index}.title` as const)}
                          placeholder="Título del capítulo"
                          label="Título del capítulo"
                        />
                        <Input
                          {...form.register(
                            `chapters.${index}.urlCoverChapter` as const
                          )}
                          placeholder="URL de la portada del capítulo"
                          label="URL de la portada del capítulo"
                        />
                        <DatePicker
                          value={publishedAt}
                          onChange={(value) => {
                            form.setValue(
                              `chapters.${index}.publishedAt`,
                              value
                            );
                          }}
                          label="Fecha de publicación"
                        />
                        <Button
                          isIconOnly
                          onClick={() => handleWarningDeleteChapter(index)}
                          color="danger"
                          variant="ghost"
                          className="w-full"
                        >
                          <SolarTrashBinTrashOutline className="size-5" />
                        </Button>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
            <Button
              fullWidth
              onClick={() =>
                append({
                  title: "",
                  urlChapter: "",
                  urlCoverChapter: "",
                  publishedAt: null,
                  status: ChapterStatus.PENDING,
                })
              }
            >
              Agregar capítulo
            </Button>
          </FormSection>

          <FormSection
            title="Datos del autor"
            description="Ingresa los datos del autor de la novela."
          >
            <FormInput
              control={form.control}
              name="authorName"
              id="authorName"
              label="Nombre del autor"
              placeholder="Nombre"
              variant="bordered"
              color="primary"
            />
            <FormInput
              control={form.control}
              name="authorPseudonym"
              id="authorPseudonym"
              label="Pseudónimo"
              placeholder="Pseudónimo"
              variant="bordered"
              color="primary"
            />
            <FormInput
              control={form.control}
              name="authorUrlProfile"
              id="authorUrlProfile"
              label="URL del perfil del autor"
              placeholder="URL del perfil del autor"
              variant="bordered"
              color="primary"
            />
          </FormSection>
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            isDisabled={!form.formState.isValid}
          >
            Crear novela
          </Button>
        </form>
      </FormProvider>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Eliminar capítulo</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de que deseas eliminar este capítulo?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpenChange}>Cancelar</Button>
            <Button color="danger" onClick={handleDeleteChapter}>
              Sí, eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
