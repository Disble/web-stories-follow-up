"use client";

import { Button, Link } from "@repo/ui/nextui";
import { publishNewChapterInFacebook } from "../novel.action";
import { toast } from "react-hot-toast";
import { useState } from "react";

type BtnCreateFbPostProps = {
  template: string;
  link: string;
  slug: string;
};

export default function BtnCreateFbPost({
  template,
  link,
  slug,
}: BtnCreateFbPostProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateFbPost = async () => {
    setIsLoading(true);
    const templateWithLink = `${template} \n ${link}`;

    const result = await publishNewChapterInFacebook(
      {
        message: templateWithLink,
        link,
        published: "true",
      },
      slug
    );

    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Publicación creada en Facebook");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button
        as={Link}
        onClick={handleCreateFbPost}
        isLoading={isLoading}
        color="primary"
        variant="bordered"
        fullWidth
      >
        Crear publicación
      </Button>
    </>
  );
}
