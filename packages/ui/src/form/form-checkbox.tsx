"use client";

import { Checkbox, type CheckboxProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormDatePickerProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
} & CheckboxProps;

export function FormCheckbox<FormData extends FieldValues>({
  control,
  name,
  ...props
}: FormDatePickerProps<FormData>): JSX.Element {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          return (
            <Checkbox
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              {...props}
              {...field}
            >
              {props.children}
            </Checkbox>
          );
        }}
      />
    </>
  );
}
