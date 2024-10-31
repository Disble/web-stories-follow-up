"use client";
import { FormSection, FormTimeInput } from "@repo/ui/form";
import { Button, type TimeInputValue } from "@repo/ui/nextui";
import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from "@internationalized/date";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ParameterListPayload } from "@repo/layer-prisma/model/parameter/parameter.interface";
import { updateFbPublicationTime } from "#components/publications/publication.action";
import { toast } from "react-hot-toast";

export const FormSchema = z.object({
  time: z.custom<TimeInputValue>(),
});

type FormData = z.infer<typeof FormSchema>;

type PublicationSettingsProps = {
  fbPublicationTime: ParameterListPayload;
};

export default function PublicationSettings({
  fbPublicationTime,
}: PublicationSettingsProps): JSX.Element {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      time: parseAbsoluteToLocal(
        fbPublicationTime.value
          ? parseZonedDateTime(fbPublicationTime.value).toAbsoluteString()
          : new Date().toISOString()
      ),
    },
  });

  const onSubmit = async (data: FormData) => {
    const time = data.time.set({
      second: 0,
      millisecond: 0,
    });
    const fbPublicationTime = await updateFbPublicationTime(time.toString());

    if ("error" in fbPublicationTime) {
      toast.error(fbPublicationTime.error);
    } else {
      toast.success("Hora de publicación actualizada correctamente");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormSection
            title="Hora recurrente de publicación"
            description="La hora de publicación será la misma para todas las novelas. Esta se realizará una vez al día. Si por algún motivo no se publica, se reintentará automáticamente al día siguiente."
          >
            <FormTimeInput control={form.control} name="time" />
            <Button
              type="submit"
              color="primary"
              isLoading={form.formState.isSubmitting}
              isDisabled={!form.formState.isValid}
            >
              Guardar
            </Button>
          </FormSection>
        </form>
      </FormProvider>
    </div>
  );
}
