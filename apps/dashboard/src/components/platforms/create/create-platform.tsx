"use client";
import { useDebounce } from "@custom-react-hooks/use-debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/nextui";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { FormInput, FormSection } from "@repo/ui/form";
import {
  createPlatform,
  isExistPlatform,
} from "#components/platforms/platform.action";

const urlSchema = z.string().url();

export const FormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  code: z.string().min(1, "El código es requerido"),
  baseUrl: urlSchema,
  urlCover: z.string().url().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreatePlatform(): JSX.Element {
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      baseUrl: "",
      code: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const [updateDebouncedValue] = useDebounce(async (value: string) => {
    if (!value) {
      form.setValue("code", "");
      form.clearErrors("code");
      return;
    }

    try {
      const hostname = new URL(value).hostname
        .replace(/^www\./, "")
        .split(".")
        .slice(0, -1)
        .join(".");

      form.setValue("code", hostname);

      if (await isExistPlatform(hostname)) {
        form.setError("code", { message: "La plataforma ya existe" });
      }
    } catch {
      return;
    }
  }, 500);

  const onSubmit = async (data: FormData) => {
    const fullURL = new URL(data.baseUrl);
    const originUrl = fullURL.origin;

    const response = await createPlatform({
      baseUrl: originUrl,
      name: data.name,
      code: data.code,
      urlCover: data.urlCover,
    });

    if (typeof response === "object" && "error" in response) {
      toast.error(response.error);
      return;
    }

    toast.success("Plataforma creada exitosamente");
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormSection
          title="Crear plataforma"
          description="Agrega una nueva plataforma"
        >
          <FormInput
            control={form.control}
            name="name"
            id="name"
            label="Nombre"
            placeholder="Nombre de la plataforma"
            variant="bordered"
            color="primary"
            isRequired
          />
          <FormInput
            control={form.control}
            name="baseUrl"
            id="baseUrl"
            label="URL"
            placeholder="https://plataforma.com"
            variant="bordered"
            color="primary"
            isRequired
            onChangeAfter={(e) => updateDebouncedValue(e.target.value)}
          />
          <FormInput
            control={form.control}
            name="code"
            id="code"
            label="Código"
            placeholder="Código de la plataforma"
            variant="bordered"
            color="primary"
            isReadOnly
            isRequired
          />
          <FormInput
            control={form.control}
            name="urlCover"
            id="urlCover"
            label="URL del logo de la plataforma"
            placeholder="https://plataforma.com/logo.png"
            variant="bordered"
            color="primary"
          />
          <Button
            type="submit"
            color="primary"
            isLoading={form.formState.isSubmitting}
            isDisabled={!form.formState.isValid}
          >
            Agregar plataforma
          </Button>
        </FormSection>
      </form>
    </FormProvider>
  );
}
