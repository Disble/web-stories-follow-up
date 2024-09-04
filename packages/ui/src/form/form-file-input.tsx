"use client";

import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from "react-hook-form";

import InputFiles from "#commons/file-upload/file-upload";
import type {
  FakeFile,
  InputFilesProps,
} from "#commons/file-upload/interfaces/file-upload.interface";
import { cn, convertMBToBytes } from "#utils";

type FormFileInputProps<
  FormData extends FieldValues,
  FakeFileType extends FakeFile,
> = {
  control: UseFormReturn<FormData>["control"];
  name: UseControllerProps<FormData>["name"];
  label: string;
  accept: Record<string, string[]>;
  maxSize: number;
  maxFiles?: number;
  fakeFiles?: InputFilesProps<FakeFileType>["fakeFiles"];
  onDeleteFakeFiles?: InputFilesProps<FakeFileType>["onDeleteFakeFiles"];
};

export const FormFileInput = <
  TFieldValues extends FieldValues,
  FakeFileType extends FakeFile,
>({
  control,
  name,
  label,
  accept,
  maxSize,
  maxFiles,
  fakeFiles = [],
  onDeleteFakeFiles,
}: FormFileInputProps<TFieldValues, FakeFileType>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <div
            className={cn("flex items-center gap-1 pb-1.5 pe-2 text-sm", {
              "text-danger": fieldState.invalid,
            })}
          >
            {label}
          </div>
          <InputFiles
            accept={accept}
            maxSize={convertMBToBytes(maxSize)}
            maxFiles={maxFiles}
            errorMessage={fieldState.error?.message}
            isInvalid={fieldState.invalid}
            fakeFiles={fakeFiles}
            onDeleteFakeFiles={onDeleteFakeFiles}
            {...field}
          />
        </div>
      )}
    />
  );
};
