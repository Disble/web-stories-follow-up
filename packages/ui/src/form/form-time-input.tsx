"use client";

import { TimeInput, type TimeInputProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormInputProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
} & Omit<TimeInputProps, "granularity">;

export const FormTimeInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TimeInput
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            fullWidth
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};
