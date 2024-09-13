import { auth } from "@repo/auth-config/auth";
import Login from "#components/auth/login/login";
import { PATH_DASHBOARD } from "#routes/index";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: { error?: string };
};

export default async function Page({
  searchParams,
}: PageProps): Promise<JSX.Element> {
  const { error } = searchParams;
  const session = await auth();

  if (session) {
    redirect(PATH_DASHBOARD.root);
  }

  return <Login error={error} />;
}
