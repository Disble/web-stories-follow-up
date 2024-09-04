import { ScrollShadow } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { SolarCloudUploadLineDuotone } from "#icons";
import { Input } from "#ui/input";
import { convertBytesToMB } from "#utils";
import { cn } from "#utils";

import { FileItem } from "./file-upload-item";
import {
  type FakeFile,
  type InputFilesProps,
  defaultErrorMessage,
} from "./interfaces/file-upload.interface";

export default function InputFiles<FakeFileType extends FakeFile>({
  onChange,
  accept,
  multiple = false,
  maxFiles = 0,
  maxSize = 30,
  fakeFiles = [],
  onDeleteFakeFiles,
  errorMessage,
  isInvalid,
  onBlur,
  name,
  ref,
}: InputFilesProps<FakeFileType>) {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item !== file);
    });
    onChange(filesToUpload.filter((item) => item !== file));
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFilesToUpload(acceptedFiles);
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const onRemoveFakeFile = (deletedFakeFile: FakeFileType) => {
    if (!onDeleteFakeFiles) throw new Error("onChangeFakeFiles is required");

    onDeleteFakeFiles(deletedFakeFile, fakeFiles);
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  const errorCodesEs: Record<string, string> = {
    "file-too-large": "El archivo es demasiado grande",
    "too-many-files": `No se pueden cargar más de ${maxFiles} archivos`,
    "file-invalid-type": "El archivo no es valido",
  };

  const errors = fileRejections.map(({ file, errors }) => {
    return {
      fileName: file.name,
      errors: errors.map(
        ({ code }) => errorCodesEs[code] || defaultErrorMessage
      ),
    };
  });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className={cn(
            "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-default-100 py-6 hover:bg-default-200",
            {
              "border-danger-300": fileRejections.length > 0 || isInvalid,
              "bg-danger-50": fileRejections.length > 0 || isInvalid,
              "hover:bg-danger-100": fileRejections.length > 0 || isInvalid,
            }
          )}
        >
          <div className=" text-center">
            <div className=" mx-auto max-w-min rounded-md border p-2">
              <SolarCloudUploadLineDuotone className="size-5" />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Arrastra tus archivos</span>
            </p>
            <p className="max-w-xs px-4 text-xs text-gray-500">
              Has clic para subir archivos &#40;estos deben ser menores de{" "}
              {convertBytesToMB(maxSize)} MB&#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          multiple={multiple}
          type="file"
          className="hidden"
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
      </div>

      {(filesToUpload.length > 0 || fakeFiles.length > 0) && (
        <div>
          <ScrollShadow
            size={40}
            className={cn({
              "h-40": multiple,
            })}
          >
            <p className="text-muted-foreground my-2 mt-6 text-sm font-medium">
              Archivos a subir
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((file) => (
                <FileItem
                  key={file.lastModified}
                  file={file}
                  onRemove={() => removeFile(file)}
                />
              ))}
              {fakeFiles.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onRemove={() => onRemoveFakeFile(file)}
                />
              ))}
            </div>
          </ScrollShadow>
        </div>
      )}

      {errorMessage && (
        <p className="p-1.5 text-tiny text-danger">{errorMessage}</p>
      )}

      {errors.length > 0 &&
        errors.map((error) => {
          return (
            <>
              <p
                key={error.fileName}
                className="p-1.5 text-tiny text-danger"
              >{`${error.fileName}:`}</p>
              <ul className="ml-5 list-disc">
                {error.errors.map((error) => {
                  return (
                    <li key={error} className="text-tiny text-danger">
                      {error}
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
    </div>
  );
}
