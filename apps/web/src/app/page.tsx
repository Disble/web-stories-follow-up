import { PATH_AUTH } from "#routes/index";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  redirect(PATH_AUTH.signin);
}
