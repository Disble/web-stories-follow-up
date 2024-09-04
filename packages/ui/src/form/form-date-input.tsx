"use client";

import { DateInput, type DateInputProps } from "@nextui-org/react";
import type { Granularity } from "@react-types/datepicker";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormInputProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  granularity?: Granularity | "month" | "year";
} & Omit<DateInputProps, "granularity">;

export const FormDateInput = <TFieldValues extends FieldValues>({
  control,
  name,
  granularity,
  ...props
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <DateInput
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            fullWidth
            // @ts-expect-error granularity is not a valid prop for DateInput
            granularity={granularity}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};
