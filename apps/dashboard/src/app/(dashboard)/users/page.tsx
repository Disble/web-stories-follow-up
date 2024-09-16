import React from "react";
import UserList from "#components/user/user-list";
import { db } from "@repo/layer-prisma/db";
import { SessionError } from "@repo/types/utils/errors";
import PaginationNext from "#components/commons/pagination-next";

export default async function Page(): Promise<JSX.Element> {
  const [users, pagination] = await db.user.getUsers({ page: 1, limit: 10 });

  if (users instanceof SessionError || pagination === null) {
    return <div>No users found</div>;
  }

  return (
    <div className="p-4">
      <UserList users={users} />
      <PaginationNext
        total={pagination.totalCount}
        page={pagination.currentPage}
        isDisabled={false}
      />
    </div>
  );
}
