"use client";
import {
  Accordion,
  AccordionItem,
  Button,
  DatePicker,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@repo/ui/nextui";
import { FormProvider } from "react-hook-form";

import {
  FormInput,
  FormSection,
  FormSelect,
  FormTextarea,
} from "@repo/ui/form";
import { SolarCloudDownloadLinear } from "@repo/ui/icons";
import { SolarTrashBinTrashOutline } from "#components/icons/index";
import { getLocalTimeZone } from "@internationalized/date";
import type { PlatformListPayload } from "@repo/layer-prisma/model/platform/platform.interface";
import usePullNovel, { urlSchema } from "./pull-novel-hook";

type PullOrCreateNovelProps = {
  platforms: PlatformListPayload[];
};

export default function PullOrCreateNovel({
  platforms,
}: PullOrCreateNovelProps): JSX.Element {
  const {
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
  } = usePullNovel({ platforms });

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
              <>
                <span className="text-sm text-gray-500">
                  {fields.length} capítulos encontrados
                </span>
                <Accordion
                  showDivider={false}
                  className="p-2 flex flex-col gap-1"
                  variant="bordered"
                  itemClasses={{
                    base: "py-0",
                    title:
                      "text-base text-ellipsis overflow-hidden line-clamp-1",
                    subtitle: "text-ellipsis overflow-hidden line-clamp-1",
                    trigger:
                      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
                    indicator: "text-medium",
                    content: "text-small px-2",
                  }}
                >
                  {fields.map((field, index) => {
                    const chapterWatched = form.watch(`chapters.${index}`);

                    const chapterTitle = chapterWatched.title;
                    const urlCoverChapter = chapterWatched.urlCoverChapter;
                    const isValidUrlCoverChapter =
                      urlSchema.safeParse(urlCoverChapter);
                    const publishedAt = chapterWatched.publishedAt;

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
                          publishedAt
                            ? formatter.format(
                                publishedAt.toDate(getLocalTimeZone())
                              )
                            : "--"
                        }
                        title={
                          chapterTitle.length > 0
                            ? chapterTitle
                            : "Capítulo de la novela"
                        }
                      >
                        <div className="space-y-3">
                          <FormInput
                            control={form.control}
                            name={`chapters.${index}.title` as const}
                            label="Título del capítulo"
                            placeholder="Título del capítulo"
                          />

                          <FormInput
                            control={form.control}
                            name={`chapters.${index}.urlChapter` as const}
                            label="URL del capítulo"
                            placeholder="URL del capítulo"
                          />

                          <FormInput
                            control={form.control}
                            name={`chapters.${index}.urlCoverChapter` as const}
                            label="URL de la portada del capítulo"
                            placeholder="URL de la portada del capítulo"
                          />

                          <DatePicker
                            key={field.id}
                            value={publishedAt}
                            onChange={(value) => {
                              form.setValue(
                                `chapters.${index}.publishedAt` as const,
                                value
                              );
                            }}
                            label="Fecha de publicación"
                          />
                          <Button
                            isIconOnly
                            onClick={() => handleWarningDeleteChapter(index)}
                            color="danger"
                            variant="bordered"
                            className="w-full"
                          >
                            <SolarTrashBinTrashOutline className="size-5" />
                          </Button>
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </>
            )}
            <Button fullWidth onClick={handleAppendChapter}>
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
            <FormInput
              control={form.control}
              name="authorUrlCoverProfile"
              id="authorUrlCoverProfile"
              label="URL de la portada del perfil del autor"
              placeholder="URL de la portada del perfil del autor"
              variant="bordered"
              color="primary"
            />
            {authorUrlCoverProfileError.success && (
              <Image
                src={authorUrlCoverProfile}
                alt="Portada del perfil del autor"
                classNames={{
                  img: "object-cover w-20 h-20",
                }}
              />
            )}
          </FormSection>

          <FormSection
            title="Plataforma"
            description="Selecciona la plataforma donde está publicada la novela."
          >
            <FormSelect
              control={form.control}
              name="platform"
              id="platform"
              label="Plataforma"
              placeholder="Selecciona la plataforma"
              variant="bordered"
              color="primary"
              options={platformsOptions}
            />

            <Button
              type="submit"
              color="primary"
              isLoading={form.formState.isSubmitting}
              isDisabled={!form.formState.isValid}
            >
              Crear novela
            </Button>
          </FormSection>
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
