"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextarea } from "@repo/ui/form";
import { Button } from "@repo/ui/nextui";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { upsertTemplate } from "#components/novel/novel.action";
import toast from "react-hot-toast";

export const FormSchema = z.object({
  text: z.string().min(1),
});

type FormData = z.infer<typeof FormSchema>;

type TemplateUpsertProps = {
  template: string;
  novelId: string;
  slug: string;
};

export default function TemplateUpsert({
  template,
  novelId,
  slug,
}: TemplateUpsertProps): JSX.Element {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: template,
    },
  });

  const onSubmit = async (values: FormData) => {
    const template = await upsertTemplate(novelId, values.text, slug);

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
              isLoading={form.formState.isSubmitting}
            >
              Guardar
            </Button>
          </form>
        </FormProvider>
      </div>
    </article>
  );
}
