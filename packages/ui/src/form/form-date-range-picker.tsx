"use client";

import { DateRangePicker, type DateRangePickerProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormDateRangePickerProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
} & DateRangePickerProps;

export function FormDateRangePicker<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: FormDateRangePickerProps<TFieldValues>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <DateRangePicker
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
