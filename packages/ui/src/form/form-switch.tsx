"use client";

import { Switch, type SwitchProps } from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

type FormSwitchPropsBase<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  label?: string;
} & SwitchProps;

type FormSwitchPropsWithText = {
  text: React.ReactNode;
  textActive?: never;
  textInactive?: never;
};

type FormSwitchPropsWithTextActiveInactive = {
  text?: never;
  textActive: React.ReactNode;
  textInactive: React.ReactNode;
};

type FormSwitchProps<FormData extends FieldValues> =
  | (FormSwitchPropsBase<FormData> & FormSwitchPropsWithText)
  | (FormSwitchPropsBase<FormData> & FormSwitchPropsWithTextActiveInactive);

export const FormSwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  text,
  textActive,
  textInactive,
  ...switchProps
}: FormSwitchProps<TFieldValues>) => {
  const prevalentText = (value: boolean) => {
    if (text) return text;
    return value ? textActive : textInactive;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          {label && <div className="pb-1.5 pe-2 text-sm">{label}</div>}
          <Switch
            size="sm"
            isSelected={field.value}
            onValueChange={field.onChange}
            {...switchProps}
          >
            {prevalentText(field.value)}
          </Switch>
        </div>
      )}
    />
  );
};
