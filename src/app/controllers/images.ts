"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function saveImages({
  galeryId,
  files,
}: {
  galeryId: string;
  files: string[];
}) {
  console.log("galeryId: ", galeryId);
  console.log("files: ", files);
  await prisma.image.createMany({
    data: files.map((file) => ({
      url: `https://zaap-bucket.s3.sa-east-1.amazonaws.com/${file}`,
      description: file,
      galeryId: galeryId,
    })),
  });

  revalidatePath("/admin/upload"); // Revalida a página após a atualização
}

export async function getImages(galeryId: string) {
  const images = await prisma.image.findMany({
    where: {
      galeryId,
    },
  });

  return images;
}
