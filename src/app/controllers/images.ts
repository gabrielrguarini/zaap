"use server";
// import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function saveFilesToDB({ title }: { title: string }) {
  console.log("title: ", title);
  // await prisma.image.createMany({
  //   data: JSON.parse(files).map((file) => ({
  //     url: file.url,
  //     description: file.description,
  //     galeryId: galeryId,
  //   })),
  // });

  revalidatePath("/admin/upload"); // Revalida a página após a atualização
}
