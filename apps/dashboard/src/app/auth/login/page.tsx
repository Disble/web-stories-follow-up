import { auth } from "@repo/auth-config/auth";
import Login from "#components/auth/login/login";
import { PATH_DASHBOARD } from "#routes/index";
import { redirect } from "next/navigation";
import { db } from "@repo/layer-prisma";
import { SessionError } from "@repo/types/utils/errors";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  if (session) {
    redirect(PATH_DASHBOARD.root);
  }

  return <Login />;
}
