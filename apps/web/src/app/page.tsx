import { Button } from "@repo/ui/nextui";
import { FormButton } from "@repo/ui/commons";
import { db } from "@repo/layer-prisma";
import PaginationNext from "#components/commons/pagination-next";
import UserList from "#components/user/user-list";

type IndexPageProps = {
  searchParams: { page: string };
};

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const [users, pagination] = await db.user.getUsers({ page: Number(searchParams.page) || 1, limit: 1 });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <div>
        <h1 className="text-3xl font-bold text-rose-500">Hello</h1>
      </div>
      <Button color="secondary" isLoading>Hello</Button>
      <FormButton />
      <UserList users={users} />
      <PaginationNext total={pagination.totalCount} page={pagination.currentPage} isDisabled={pagination.totalCount === 0} />
    </div>
  );
}
