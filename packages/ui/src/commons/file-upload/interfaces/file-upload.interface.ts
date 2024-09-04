import type { ControllerRenderProps, RefCallBack } from "react-hook-form";

export enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

export const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

export const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

export const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

export const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

export const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export const defaultErrorMessage =
  "Se intentó subir más de un archivo o el formato es incorrecto.";

export type AcceptMIME = Record<string, Array<string>>;

export type FakeFile = {
  id: number | string;
  name: string;
  type: string;
};

export type InputFilesProps<FakeFileType extends FakeFile> = {
  onChange: ControllerRenderProps["onChange"];
  accept?: AcceptMIME;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  fakeFiles?: FakeFileType[];
  onDeleteFakeFiles?: (
    fakeFile: FakeFileType,
    fakeFiles: FakeFileType[]
  ) => void;
  errorMessage?: string;
  isInvalid?: boolean;
  onBlur?: () => void;
  name?: string;
  ref?: RefCallBack;
};
