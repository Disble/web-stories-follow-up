"use client";

import React from "react";
import { Avatar, cn, Link } from "@nextui-org/react";

import CellWrapper from "./cell-wrapper";

export type UserCellProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar: string;
  name: string;
  slug: string;
};

const UserCell = React.forwardRef<HTMLDivElement, UserCellProps>(
  ({ avatar, name, slug: permission, className, ...props }, ref) => (
    <CellWrapper
      ref={ref}
      className={cn("bg-transparent px-3 py-1", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Avatar className="shrink-0" size="sm" src={avatar} />
        <p className="text-small text-default-500">{name}</p>
      </div>
      <Link
        href={permission}
        color="primary"
        className="text-small text-default-400 shrink-0"
      >
        Ver más
      </Link>
    </CellWrapper>
  )
);

UserCell.displayName = "UserCell";

export default UserCell;
