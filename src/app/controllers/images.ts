"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function setImagesToGalery({
  galeryId,
  files,
}: {
  galeryId: string;
  files: string[];
}) {
  await prisma.image.createMany({
    data: files.map((file) => ({
      url: `https://zaap-bucket.s3.sa-east-1.amazonaws.com/${file}`,
      description: file,
      galeryId: galeryId,
    })),
  });

  revalidatePath("/admin/upload");
}

export async function getImages(galeryId: string) {
  const images = await prisma.image.findMany({
    where: {
      galeryId,
    },
  });

  return images;
}
