"use client";

import { DatePicker, type DatePickerProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormDatePickerProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
} & DatePickerProps;

export function FormDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: FormDatePickerProps<TFieldValues>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <DatePicker
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
}
