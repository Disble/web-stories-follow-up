"use client";

import { Input, type InputProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormInputProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
} & InputProps & {
    onChangeAfter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  onChangeAfter,
  ...props
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Input
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            fullWidth
            {...props}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              props.onChange?.(e);
              onChangeAfter?.(e);
            }}
          />
        );
      }}
    />
  );
};
