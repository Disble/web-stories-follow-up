"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Spacer,
  Divider,
  AvatarGroup,
  Avatar,
  ScrollShadow,
} from "@nextui-org/react";

import UserCell from "./user-cell";
import type { ChapterListPayload } from "@repo/layer-prisma/model/chapter/chapter.interface";
import { PATH_DASHBOARD } from "#routes/index";

type ListTailNovelsProps = {
  chapters: ChapterListPayload[];
};

export default function ListTailNovels({ chapters }: ListTailNovelsProps) {
  const userList = React.useMemo(() => {
    return chapters.map((chapter, i) => (
      <div className="mt-2 flex flex-col gap-2" key={chapter.id}>
        <UserCell
          avatar={chapter.novelPlatform.urlCoverNovel}
          name={chapter.title}
          slug={`${PATH_DASHBOARD.novel}/${chapter.novelPlatform.novel.slug}`}
        />
        {i !== chapters.length - 1 && <Divider />}
      </div>
    ));
  }, [chapters]);

  return (
    <Card className="w-full border-1" shadow="none">
      <CardHeader className="justify-center px-6 pb-0 pt-6">
        <div className="flex flex-col items-center">
          <AvatarGroup isBordered size="sm">
            {chapters.slice(0, 3).map((chapter) => (
              <Avatar
                key={chapter.id}
                src={chapter.novelPlatform.urlCoverNovel}
              />
            ))}
          </AvatarGroup>
          <Spacer y={2} />
          <h4 className="text-large">Novelas</h4>
          <p className="text-center text-small text-default-500">
            Últimos capítulos agregados
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <ScrollShadow className="h-[70svh] w-full">{userList}</ScrollShadow>
      </CardBody>
    </Card>
  );
}
