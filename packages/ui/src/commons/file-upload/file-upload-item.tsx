import { Tooltip } from "@nextui-org/react";

import {
  IconoirCancel,
  SolarFileLineDuotone,
  SolarFolderWithFilesLineDuotone,
  SolarGalleryLineDuotone,
  SolarSoundwaveLineDuotone,
  SolarVideoFramePlayVerticalLineDuotone,
} from "#icons";
import { cn } from "#utils";

import {
  AudioColor,
  type FakeFile,
  FileTypes,
  ImageColor,
  OtherColor,
  PdfColor,
  VideoColor,
} from "./interfaces/file-upload.interface";

/**
 * Render a file item in the file list.
 *
 * @param {Object} props - The properties of the file item.
 * @param {File | FakeFile} props.file - The file to render.
 * @param {(file: File | FakeFile) => void} props.onRemove - The function to call when the file is removed.
 * @returns {JSX.Element} The rendered file item.
 */
export const FileItem = ({
  file,
  onRemove,
}: {
  file: File | FakeFile;
  onRemove: () => void;
}): JSX.Element => {
  const getFileIconAndColor = (file: File | FakeFile) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: (
          <SolarGalleryLineDuotone className="size-8 py-1 text-purple-600" />
        ),
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <SolarFileLineDuotone className="size-8 py-1 text-blue-400" />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: (
          <SolarSoundwaveLineDuotone className="size-8 py-1 text-yellow-400" />
        ),
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: (
          <SolarVideoFramePlayVerticalLineDuotone className="size-8 py-1 text-green-400" />
        ),
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: (
        <SolarFolderWithFilesLineDuotone
          className={cn("size-10", OtherColor.fillColor)}
        />
      ),
      color: OtherColor.bgColor,
    };
  };

  return (
    <div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0">
      <div className="flex flex-1 items-center px-2">
        <div className="text-white">{getFileIconAndColor(file).icon}</div>

        <div className="ml-2 w-full space-y-1">
          <div className="flex justify-between text-sm">
            <Tooltip key={file.name} content={file.name} delay={500}>
              <p className="text-muted-foreground max-w-60 overflow-hidden truncate">
                {file.name}
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
      >
        <IconoirCancel className="size-5" />
      </button>
    </div>
  );
};
