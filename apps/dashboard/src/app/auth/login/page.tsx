import { auth } from "@repo/auth-config/auth";
import Login from "#components/auth/login/login";
import { PATH_DASHBOARD } from "#routes/index";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  if (session) {
    redirect(PATH_DASHBOARD.root);
  }

  return (
    <Login />
  );
}
