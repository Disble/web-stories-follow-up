"use client";

import { Select, SelectItem, type SelectProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormSelectProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  label: string;
  options: Array<{ key: string; value: string; label: string }>;
} & Omit<SelectProps, "children">;

export const FormSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  ...selectProps
}: FormSelectProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          variant="bordered"
          errorMessage={fieldState.error?.message}
          isInvalid={fieldState.invalid}
          selectedKeys={[field.value]}
          disallowEmptySelection
          {...selectProps}
          {...field}
        >
          {options.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};
