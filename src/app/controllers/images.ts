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

export async function createImage({
  url,
  galleryId,
}: {
  url: string;
  galleryId: string;
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  await prisma.image.create({
    data: {
      galleryId,
      url,
      description: url,
    },
  });
}

export async function getImageById(id: string) {
  try {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });
    return image;
  } catch (error) {
    throw new Error(`Erro ao buscar imagem por id --> ${error}`);
  }
}

export async function deleteImageByIdFromDb(id: string) {
  try {
    const image = await prisma.image.delete({
      where: {
        id,
      },
    });
    return image;
  } catch (error) {
    throw new Error(`Erro ao deletar imagem por id --> ${error}`);
  }
}
export async function deleteAllImagesByGalleryIdFromDb(galleryId: string) {
  try {
    const deletedImages = await prisma.image.deleteMany({
      where: {
        galleryId,
      },
    });

    return deletedImages;
  } catch (error) {
    console.error("Erro ao deletar imagens:", error);
    throw new Error("Erro ao deletar imagens");
  }
}

export async function deleteImage(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  try {
    const imageDb = await getImageById(id);

    if (!imageDb) {
      throw new Error("Imagem não encontrada no banco");
    }

    const urlImage = new URL(imageDb.url);
    const keyImage = decodeURIComponent(urlImage.pathname.slice(1));

    console.log("keyImage ->", keyImage);
    const deleteCommand = new DeleteObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: keyImage,
    });

    const imageDeleted = await s3.send(deleteCommand);
    const imageDeletedFromDb = await deleteImageByIdFromDb(id);

    console.log("Imagem deletada do S3:", imageDeleted);
    console.log("Imagem deletada do banco:", imageDeletedFromDb);
    return { imageDeleted, imageDeletedFromDb };
  } catch (error) {
    console.error("Erro ao excluir imagem do S3:", error);
    throw new Error("Erro ao excluir a imagem do S3.");
  }
}

export async function getImagesByGalleryId(galleryId: string) {
  const images = await prisma.image.findMany({
    where: {
      galleryId,
    },
  });

  return images;
}
