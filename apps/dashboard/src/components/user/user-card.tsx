"use client";

import { Button, Card, CardFooter, Image } from "@repo/ui/nextui";
import type { db } from "@repo/layer-prisma/db";
import type { SessionError } from "@repo/types/utils/errors";

type UserCardProps = {
  user: Exclude<
    Awaited<ReturnType<typeof db.user.getUsers>>[0],
    SessionError
  >[0];
};

export default function UserCard({ user }: UserCardProps): JSX.Element {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt={`Profile picture of ${user.name}`}
        className="object-cover"
        height={200}
        src={"https://nextui.org/images/hero-card.jpeg"}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{user.name}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
