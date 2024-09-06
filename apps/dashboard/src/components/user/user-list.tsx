import type { SessionError } from "@repo/types/utils/errors";
import UserCard from "./user-card";
import type { db } from "@repo/layer-prisma";

type UserListProps = {
  users: Exclude<Awaited<ReturnType<typeof db.user.getUsers>>[0], SessionError>;
};

export default function UserList({ users }: UserListProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-4">
      {users ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}
