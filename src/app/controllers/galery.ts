"use server";

import { prisma } from "@/utils/prisma";

export async function createGalery(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.galery.create({
    data: {
      title,
      authorId: "1",
    },
  });
}

export async function getGalery({ authorId }: { authorId: string }) {
  const galery = await prisma.galery.findMany({ where: { authorId } });
  return galery;
}
