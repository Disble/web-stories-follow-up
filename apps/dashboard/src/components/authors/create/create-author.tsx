"use client";
import { useDebounce } from "@custom-react-hooks/use-debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image } from "@repo/ui/nextui";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { FormInput, FormSection } from "@repo/ui/form";
import { createAuthor, isExistAuthor } from "#components/authors/author.action";

const urlRelativeSchema = z.string().regex(/\/(?:[\w-]+\/)*[\w-]+/);

export const FormSchema = z.object({
  name: z.string().optional(),
  pseudonym: z.string().min(1),
  urlCoverProfile: urlRelativeSchema,
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateAuthor(): JSX.Element {
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      pseudonym: "",
      urlCoverProfile: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const [updateDebouncedValue] = useDebounce(
    async (value: string) => {
      if (await isExistAuthor(value)) {
        form.setError("pseudonym", {
          type: "custom",
          message: "El pseudónimo ya existe",
        });
      }
    },
    500,
    {
      leading: true,
    }
  );

  const authorUrlCoverProfile = form.watch("urlCoverProfile");
  const authorUrlCoverProfileError = urlRelativeSchema.safeParse(
    authorUrlCoverProfile
  );

  const onSubmit = async (values: FormData) => {
    const response = await createAuthor(values);

    if ("error" in response) {
      toast.error(response.error);
    } else {
      toast.success("Autor agregado con éxito");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormSection
          title="Datos del autor"
          description="Ingresa los datos del autor de la novela."
        >
          <FormInput
            control={form.control}
            name="name"
            id="name"
            label="Nombre"
            placeholder="Nombre"
            variant="bordered"
            color="primary"
          />
          <FormInput
            control={form.control}
            name="pseudonym"
            id="pseudonym"
            label="Pseudónimo"
            placeholder="Pseudónimo"
            variant="bordered"
            color="primary"
            onChangeAfter={(e) => updateDebouncedValue(e.target.value)}
          />
          <FormInput
            control={form.control}
            name="urlCoverProfile"
            id="urlCoverProfile"
            label="URL del perfil"
            placeholder="URL del perfil"
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
          <Button
            type="submit"
            color="primary"
            isLoading={form.formState.isSubmitting}
            isDisabled={!form.formState.isValid}
          >
            Agregar autor
          </Button>
        </FormSection>
      </form>
    </FormProvider>
  );
}
