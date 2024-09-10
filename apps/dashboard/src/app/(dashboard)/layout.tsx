import { auth } from "@repo/auth-config/auth";
import Sidebar from "#components/sidebar";
import { PATH_AUTH } from "#routes/index";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: { children: React.ReactNode }): Promise<JSX.Element> {
  const session = await auth();

  if (!session) {
    redirect(PATH_AUTH.signin);
  }

  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}
