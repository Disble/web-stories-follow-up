"use client";

import type React from "react";
import {
  Avatar,
  Button,
  Spacer,
  useDisclosure,
  Skeleton,
} from "@repo/ui/nextui";

import { sectionNestedItems } from "./sidebar-items";
import SidebarDrawer from "./sidebar-drawer";

import Sidebar from "./sidebard";
import {
  SolarHamburgerMenuLineDuotone,
  SolarLogout2Outline,
} from "#components/icons";
import { logOut } from "#components/auth/login/login.action";
import { useSession } from "next-auth/react";
import { ElLectorNovato, SolarQuestionCircleLinear } from "@repo/ui/icons";
import { usePathname } from "next/navigation";
import { getTitle } from "#routes/index";

export default function Component({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, status } = useSession();
  const pathname = usePathname();
  const currentPath = pathname;

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-2 px-2">
        <ElLectorNovato className="w-48 h-8" />
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        {status === "loading" ? (
          <>
            <Skeleton className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-default-200"></div>
            </Skeleton>
            <div className="flex flex-col">
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <Spacer y={8} />

      <Sidebar
        defaultSelectedKey="home"
        selectedKeys={[currentPath]}
        items={sectionNestedItems}
      />

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <SolarQuestionCircleLinear className="text-default-500 size-6" />
          }
          variant="light"
        >
          Ayuda y Soporte
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <SolarLogout2Outline className="rotate-180 text-default-500 size-6" />
          }
          variant="light"
          onPress={() => logOut()}
        >
          Cerrar Sesión
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
      <div className="w-full flex-1 flex-col p-4 h-dvh overflow-auto">
        <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4">
          <Button
            isIconOnly
            className="flex sm:hidden"
            size="sm"
            variant="light"
            onPress={onOpen}
          >
            <SolarHamburgerMenuLineDuotone className="text-default-500 size-6" />
          </Button>
          <h2 className="text-medium font-medium text-default-700">
            {getTitle(currentPath)}
          </h2>
        </header>
        <main className="mt-4 min-h-[calc(100%-5rem)] w-full">
          <div className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
