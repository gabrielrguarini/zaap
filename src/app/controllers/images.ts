"use server";
import { auth } from "@/auth";
import { env } from "@/env";
import { prisma } from "@/utils/prisma";
import { s3 } from "@/utils/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

export async function setImagesToGalery({
  galleryId,
  files,
}: {
  galleryId: string;
  files: string[];
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  await prisma.image.createMany({
    data: files.map((file) => ({
      url: `https://zaap-bucket.s3.sa-east-1.amazonaws.com/${file}`,
      description: file,
      galleryId,
    })),
  });

  revalidatePath("/admin/upload");
}

export async function deleteImage(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  console.log("deleta imagem -> ", id);
  const imageDb = await prisma.image.delete({
    where: {
      id,
    },
  });

  if (!imageDb) {
    throw new Error("Imagem não encontrada no banco");
  }

  console.log("imageDb -> ", imageDb);
  const urlImage = new URL(imageDb.url);
  const keyImage = urlImage.pathname.slice(1);
  console.log("keyImage -> ", keyImage);

  const deleteCommand = new DeleteObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: keyImage,
  });
  try {
    const imageDeleted = await s3.send(deleteCommand);
    console.log("imageDeleted -> ", imageDeleted);
    // revalidatePath(`/galeria`);
    return { imageDeleted, imageDb };
  } catch (error) {
    console.error("Erro ao excluir imagem do S3:", error);
    throw new Error("Erro ao excluir a imagem do S3.");
  }
}

export async function getImages(galleryId: string) {
  const images = await prisma.image.findMany({
    where: {
      galleryId,
    },
  });

  return images;
}
