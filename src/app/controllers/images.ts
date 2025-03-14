"use server";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function setImagesToGalery({
  galleryId,
  files,
}: {
  galleryId: string;
  files: string[];
}) {
  await prisma.image.createMany({
    data: files.map((file) => ({
      url: `https://zaap-bucket.s3.sa-east-1.amazonaws.com/${file}`,
      description: file,
      galleryId,
    })),
  });

  revalidatePath("/admin/upload");
}

export async function getImages(galleryId: string) {
  const images = await prisma.image.findMany({
    where: {
      galleryId,
    },
  });

  return images;
}
