"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminTable } from "./_components/admin-table";

export default async function AdminPage() {
  const sessao = await auth();
  if (!sessao) {
    redirect("/sign-in");
  }
  return <AdminTable />;
}
