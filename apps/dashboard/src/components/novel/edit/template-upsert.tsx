"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import { FormTextarea } from "@repo/ui/form";
import { Button } from "@repo/ui/nextui";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { upsertTemplate } from "../novel.action";
import { useState } from "react";
import toast from "react-hot-toast";

export const FormSchema = z.object({
  text: z.string().min(1),
});

type FormData = z.infer<typeof FormSchema>;

type TemplateUpsertProps = {
  novel: NovelFindBySlugPayload;
};

export default function TemplateUpsert({
  novel,
}: TemplateUpsertProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: novel.template?.text ?? "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    const template = await upsertTemplate(novel.id, values.text, novel.slug);
    setIsLoading(false);

    if ("error" in template) {
      toast.error(template.error);
    } else {
      toast.success("Plantilla actualizada con éxito");
    }
  };

  return (
    <article className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Plantilla</h2>
      <div className="flex flex-col gap-2">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormTextarea
              control={form.control}
              name="text"
              placeholder="Esta plantilla se usará para generar las publicaciones de los capítulos."
              variant="bordered"
              classNames={{
                input: "resize-y min-h-[120px]",
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              isDisabled={!form.formState.isValid}
              isLoading={isLoading}
            >
              Guardar
            </Button>
          </form>
        </FormProvider>
      </div>
    </article>
  );
}
