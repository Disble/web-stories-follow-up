import { Chip } from "@nextui-org/react";

import { type SidebarItem, SidebarItemType } from "./sidebard";
import TeamAvatar from "./team-avatar";
import { SolarAddCircleBoldDuotone } from "../icons";
import {
  CogAltIcon,
  SolarAddCircleLinear,
  SolarBook2Linear,
  SolarBuildings3Linear,
  SolarCalendarLinear,
  SolarChecklistMinimalisticLinear,
  SolarHome2Linear,
  SolarSettingsLinear,
  SolarUserLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "@repo/ui/icons";
import React from "react";
import { PATH_DASHBOARD } from "#routes/index";

export const sectionNestedItems: SidebarItem[] = [
  {
    key: PATH_DASHBOARD.root,
    href: PATH_DASHBOARD.root,
    title: "Inicio",
    startContent: (
      <SolarHome2Linear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
  },
  {
    key: PATH_DASHBOARD.novels.list,
    title: "Novelas",
    startContent: (
      <SolarBook2Linear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    type: SidebarItemType.Nest,
    items: [
      {
        key: PATH_DASHBOARD.novels.list,
        href: PATH_DASHBOARD.novels.list,
        startContent: (
          <SolarChecklistMinimalisticLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Lista",
      },
      {
        key: PATH_DASHBOARD.novels.create,
        href: PATH_DASHBOARD.novels.create,
        startContent: (
          <SolarAddCircleLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Agregar",
      },
    ],
  },
  {
    key: PATH_DASHBOARD.authors.list,
    startContent: (
      <SolarUserLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Autores",
    type: SidebarItemType.Nest,
    items: [
      {
        key: PATH_DASHBOARD.authors.list,
        href: PATH_DASHBOARD.authors.list,
        startContent: (
          <SolarChecklistMinimalisticLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Lista",
      },
      {
        key: PATH_DASHBOARD.authors.create,
        href: PATH_DASHBOARD.authors.create,
        startContent: (
          <SolarAddCircleLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Agregar",
      },
    ],
  },
  {
    key: PATH_DASHBOARD.platforms.list,
    startContent: (
      <SolarBuildings3Linear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Plataformas",
    type: SidebarItemType.Nest,
    items: [
      {
        key: PATH_DASHBOARD.platforms.list,
        href: PATH_DASHBOARD.platforms.list,
        startContent: (
          <SolarChecklistMinimalisticLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Lista",
      },
      {
        key: PATH_DASHBOARD.platforms.create,
        href: PATH_DASHBOARD.platforms.create,
        startContent: (
          <SolarAddCircleLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Agregar",
      },
    ],
  },
  {
    key: PATH_DASHBOARD.publications.list,
    startContent: (
      <SolarCalendarLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Publicaciones",
    type: SidebarItemType.Nest,
    items: [
      {
        key: PATH_DASHBOARD.publications.list,
        href: PATH_DASHBOARD.publications.list,
        startContent: (
          <SolarChecklistMinimalisticLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Lista",
      },
      {
        key: PATH_DASHBOARD.publications.create,
        href: PATH_DASHBOARD.publications.create,
        startContent: (
          <SolarAddCircleLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Agregar",
      },
      {
        key: PATH_DASHBOARD.publications.settings,
        href: PATH_DASHBOARD.publications.settings,
        startContent: (
          <SolarSettingsLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
        ),
        title: "Configuración",
      },
    ],
  },
  {
    key: PATH_DASHBOARD.users.list,
    href: PATH_DASHBOARD.users.list,
    startContent: (
      <SolarUsersGroupTwoRoundedLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Usuarios",
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
];
