import CreatePlatform from "#components/platforms/create/create-platform";
import { PATH_DASHBOARD } from "#routes/index";
import { auth } from "@repo/auth-config/auth";
import { Role } from "@repo/layer-prisma";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  if (session?.user.role !== Role.SUPER_ADMIN) {
    redirect(PATH_DASHBOARD.root);
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <CreatePlatform />
    </div>
  );
}
