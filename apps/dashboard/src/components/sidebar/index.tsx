"use client";

import type React from "react";
import { Avatar, Button, Spacer, useDisclosure } from "@nextui-org/react";

import { sectionItemsWithTeams } from "./sidebar-items";
import SidebarDrawer from "./sidebar-drawer";

import Sidebar from "./sidebard";
import {
  SolarBook2BoldDuotone,
  SolarChatSquareCallBoldDuotone,
  SolarLogout2Outline,
  SolarUserCircleBoldDuotone,
} from "../icons";
import { logOut } from "#components/auth/login/login.action";
import { useSession } from "next-auth/react";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function Component({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, status } = useSession();

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
          <SolarUserCircleBoldDuotone className="text-background" />
        </div>
        <span className="text-small font-bold uppercase text-foreground">
          Acme
        </span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <Avatar
          isBordered
          size="sm"
          src={
            status === "authenticated" && data?.user?.image
              ? data.user.image
              : "https://i.pravatar.cc/150?u=a04258114e29026708c"
          }
        />
        <div className="flex flex-col">
          <p className="text-small font-medium text-default-600">
            {status === "authenticated" ? data?.user?.name : "Guest"}
          </p>
          <p className="text-tiny text-default-400">Admin</p>
        </div>
      </div>

      <Spacer y={8} />

      <Sidebar defaultSelectedKey="home" items={sectionItemsWithTeams} />

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <SolarBook2BoldDuotone className="text-default-500 size-6" />
          }
          variant="light"
        >
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <SolarLogout2Outline className="rotate-180 text-default-500 size-6" />
          }
          variant="light"
          onPress={() => logOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh w-full">
      <SidebarDrawer
        className=" !border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col p-4">
        <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4">
          <Button
            isIconOnly
            className="flex sm:hidden"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <SolarChatSquareCallBoldDuotone className="text-default-500 size-6" />
          </Button>
          <h2 className="text-medium font-medium text-default-700">Overview</h2>
        </header>
        <main className="mt-4 h-full w-full overflow-visible">
          <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
