"use client";

import {
  Button,
  type TextAreaProps,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

import { SolarMaximizeLineDuotone } from "#icons";

import FormTextareaModal from "./form-textarea-modal";

type FormTextareaProps<FormData extends FieldValues> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  allowMaximize?: boolean;
  allowToolbar?: boolean;
  toolbarEnd?: React.ReactNode;
  modalTitle?: string;
} & TextAreaProps;

export const FormTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  allowMaximize = false,
  allowToolbar = false,
  toolbarEnd,
  modalTitle,
  ...textAreaProps
}: FormTextareaProps<TFieldValues>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => {
            return (
              <Textarea
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                fullWidth
                {...textAreaProps}
                {...field}
              />
            );
          }}
        />
        {(allowToolbar || allowMaximize) && (
          <div className="absolute left-1 top-8 space-x-1">
            {allowMaximize && (
              <Tooltip content="Ampliar en ventana" delay={500}>
                <Button
                  isIconOnly
                  size="sm"
                  onPress={onOpen}
                  className="!size-6 min-w-6"
                >
                  <SolarMaximizeLineDuotone className="size-4 text-gray-600" />
                </Button>
              </Tooltip>
            )}
            {allowToolbar && toolbarEnd}
          </div>
        )}
      </div>
      {allowMaximize && (
        <FormTextareaModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          control={control}
          name={name}
          title={modalTitle}
        />
      )}
    </>
  );
};
