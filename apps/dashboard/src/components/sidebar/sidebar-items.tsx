import { Chip } from "@nextui-org/react";

import { type SidebarItem, SidebarItemType } from "./sidebard";
import TeamAvatar from "./team-avatar";
import { SolarAddCircleBoldDuotone } from "../icons";
import {
  SolarAddCircleLinear,
  SolarBook2Linear,
  SolarCalendarLinear,
  SolarChecklistMinimalisticLinear,
  SolarHome2Linear,
  SolarUserLinear,
  SolarUsersGroupTwoRoundedLinear,
} from "@repo/ui/icons";
import React from "react";
import { PATH_DASHBOARD } from "#routes/index";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const brandItems: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "#",
        title: "Home",
      },
      {
        key: "projects",
        href: "#",
        title: "Projects",
        endContent: (
          <SolarAddCircleBoldDuotone className="text-primary-foreground/60 size-6" />
        ),
      },
      {
        key: "tasks",
        href: "#",
        title: "Tasks",
        endContent: (
          <SolarAddCircleBoldDuotone className="text-primary-foreground/60 size-6" />
        ),
      },
      {
        key: "team",
        href: "#",
        title: "Team",
      },
      {
        key: "tracker",
        href: "#",
        title: "Tracker",
        endContent: (
          <Chip
            className="bg-primary-foreground font-medium text-primary"
            size="sm"
            variant="flat"
          >
            New
          </Chip>
        ),
      },
    ],
  },
  {
    key: "your-teams",
    title: "Your Teams",
    items: [
      {
        key: "nextui",
        href: "#",
        title: "NextUI",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Next UI"
          />
        ),
      },
      {
        key: "tailwind-variants",
        href: "#",
        title: "Tailwind Variants",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="Tailwind Variants"
          />
        ),
      },
      {
        key: "nextui-pro",
        href: "#",
        title: "NextUI Pro",
        startContent: (
          <TeamAvatar
            classNames={{
              base: "border-1 border-primary-foreground/20",
              name: "text-primary-foreground/80",
            }}
            name="NextUI Pro"
          />
        ),
      },
    ],
  },
];

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
    href: PATH_DASHBOARD.authors.list,
    startContent: (
      <SolarUserLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Autores",
    endContent: <SolarAddCircleLinear className="text-default-400 size-6" />,
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
  {
    key: PATH_DASHBOARD.publications.list,
    href: PATH_DASHBOARD.publications.list,
    startContent: (
      <SolarCalendarLinear className="text-default-500 group-data-[selected=true]:text-foreground size-6" />
    ),
    title: "Publicaciones",
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
];
