import { auth } from "@repo/auth-config/auth";
import Sidebar from "#components/sidebar";
import { PATH_AUTH } from "#routes/index";
import { redirect } from "next/navigation";
import VerifyUser from "#components/auth/verify-user/verify-user";

export default async function Layout({
  children,
}: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await auth();

  if (!session) {
    redirect(PATH_AUTH.signin);
  }

  if (!session?.user.active) {
    return <VerifyUser />;
  }

  return (
    <>
      <Sidebar sessionRole={session.user.role}>{children}</Sidebar>
    </>
  );
}
