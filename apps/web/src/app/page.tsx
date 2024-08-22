import prisma from "@repo/database";
import { Button } from "@repo/ui/nextui";
import { FormButton } from "@repo/ui/commons";

export default async function IndexPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <div>
        <h1 className="text-3xl font-bold text-rose-500">Hello</h1>
      </div>
      <Button color="secondary" isLoading>Hello</Button>
      <FormButton />
    </div>
  );
}
