"use client";

import { SolarRefreshLineDuotone } from "@repo/ui/icons";
import { Button, Tooltip } from "@repo/ui/nextui";
import { useState } from "react";
import { updateChapters } from "../novel.action";
import type { NovelFindBySlugPayload } from "@repo/layer-prisma/model/novel/novel.interface";
import toast from "react-hot-toast";

type BtnChaptersUpdateProps = {
  slug: string;
  novelId: string;
  novelUrl: string;
  chapters: NovelFindBySlugPayload["chapters"];
};

export default function BtnChaptersUpdate({
  slug,
  novelId,
  novelUrl,
  chapters,
}: BtnChaptersUpdateProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateChapters = async () => {
    setIsLoading(true);

    const result = await updateChapters(slug, novelUrl, chapters, novelId);

    setIsLoading(false);

    if (!result) {
      toast.error("Error al actualizar los capítulos");
      return;
    }

    toast.success("Capítulos actualizados correctamente");
  };

  return (
    <>
      <Tooltip content="Actualizar capítulos">
        <Button
          isLoading={isLoading}
          color="primary"
          variant="ghost"
          isIconOnly
          onClick={handleUpdateChapters}
          size="sm"
        >
          <SolarRefreshLineDuotone className="size-5" />
        </Button>
      </Tooltip>
    </>
  );
}
