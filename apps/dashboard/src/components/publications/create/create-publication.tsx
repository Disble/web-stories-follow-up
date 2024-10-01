"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormSection, FormTextarea } from "@repo/ui/form";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const FormSchema = z.object({
  text: z.string().min(1),
  chapterId: z.string().min(1),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreatePublication(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      text: "",
      chapterId: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);

    // const response = await createAuthor(values);

    // if ("error" in response) {
    //   toast.error(response.error);
    // } else {
    //   toast.success("Autor agregado con éxito");
    // }

    setIsLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormSection
          title="Publicación"
          description="Ingresa el texto de la publicación."
        >
          <FormTextarea
            control={form.control}
            name="text"
            id="text"
            label="Texto"
            placeholder="Texto"
            variant="bordered"
            color="primary"
            classNames={{
              input: "resize-y min-h-[120px]",
            }}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
}
