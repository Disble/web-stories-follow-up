import UserCard from "./user-card";
import { db } from "@repo/layer-prisma";

type UserListProps = {
  users: Awaited<ReturnType<typeof db.user.getUsers>>[0];
};

export default function UserList({
  users,
}: UserListProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
