import { auth } from "@/auth";
import { SignInForm } from "../_components/sign-in-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const sessao = await auth();
  if (sessao) {
    redirect("/admin");
  }
  return <SignInForm />;
}
