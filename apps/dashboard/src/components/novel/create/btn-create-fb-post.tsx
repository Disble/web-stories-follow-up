"use client";

import { Button, Link } from "@repo/ui/nextui";
import { publishNewChapterInFacebook } from "../novel.action";
import { toast } from "react-hot-toast";

type BtnCreateFbPostProps = {
  template: string;
  link: string;
};

export default function BtnCreateFbPost({
  template,
  link,
}: BtnCreateFbPostProps): JSX.Element {
  const handleCreateFbPost = async () => {
    const result = await publishNewChapterInFacebook({
      message: template,
      link,
      published: true,
    });

    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Publicación creada en Facebook");
    }
  };

  return (
    <>
      <Button
        as={Link}
        onClick={handleCreateFbPost}
        color="primary"
        variant="bordered"
        fullWidth
      >
        Crear publicación
      </Button>
    </>
  );
}
