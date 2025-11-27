"use server";

import { prisma } from "@/utils/prisma";
import { auth } from "@/auth";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";
import { s3 } from "@/utils/s3Client";
import {
  deleteAllImagesByGalleryIdFromDb,
  getImagesByGalleryId,
} from "./images";
import { revalidatePath } from "next/cache";

export interface CreateGalleryProps {
  id: string;
  title: string;
  type: string | null;
  location: string | null;
  image: string;
  date?: Date | undefined;
}

export async function createGallery(data: CreateGalleryProps) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  const { title, type, location, date, image, id } = data;
  await prisma.gallery.create({
    data: {
      id,
      title,
      type,
      location,
      date,
      imageUrl: `https://${env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${image}`,
      authorId: 1,
    },
  });
}

export interface UpdateGalleryProps {
  id: string;
  title: string;
  type: string | null;
  location: string | null;
  image?: string;
  date?: Date | undefined;
}

export async function updateGallery(data: UpdateGalleryProps) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para atualizar galeria");
  }
  const { title, type, location, date, image, id } = data;

  await prisma.gallery.update({
    where: { id },
    data: {
      title,
      type,
      location,
      date,
      imageUrl: image
        ? `https://${env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${image}`
        : undefined,
    },
  });

  revalidatePath("/admin");
}

export async function deleteGalleryFromDb({ id }: { id: string }) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para deletar imagem");
  }
  const gallery = await prisma.gallery.delete({
    where: {
      id,
    },
  });
  return gallery;
}

export async function getGallery({ authorId }: { authorId: number }) {
  const gallery = await prisma.gallery.findMany({ where: { authorId } });
  return gallery;
}

export async function getGalleriesIds() {
  const galleries = await prisma.gallery.findMany({
    select: {
      id: true,
    },
  });
  return galleries.map((gallery) => gallery.id);
}

export async function getGalleryById(galleryId: string) {
  const gallery = await prisma.gallery.findUnique({
    where: {
      id: galleryId,
    },
  });
  return gallery;
}
export async function getGalleries({
  search,
  isPublicFilter,
  take,
}: {
  search: string;
  isPublicFilter?: boolean;
  take?: number;
}) {
  const galleries = await prisma.gallery.findMany({
    take,
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
      ...(isPublicFilter !== undefined && { isPublic: isPublicFilter }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return galleries;
}

export async function deleteGallery(galleryId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Usuário sem permissão para excluir a galeria");
  }

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
    });

    const images = await getImagesByGalleryId(galleryId);

    let objectsToDelete: { Key: string }[] = [];

    if (images && images.length > 0) {
      objectsToDelete = images.map((image) => {
        const urlImage = new URL(image.url);
        const keyImage = decodeURIComponent(urlImage.pathname.slice(1));
        return { Key: keyImage };
      });
    }

    if (gallery && gallery.imageUrl) {
      const urlImage = new URL(gallery.imageUrl);
      const keyCover = decodeURIComponent(urlImage.pathname.slice(1));
      objectsToDelete.push({ Key: keyCover });
    }

    if (objectsToDelete.length > 0) {
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Delete: {
          Objects: objectsToDelete,
          Quiet: false,
        },
      });

      const s3Response = await s3.send(deleteCommand);
      console.log("Resposta do S3:", s3Response);
    }

    const dbResponse = await deleteAllImagesByGalleryIdFromDb(galleryId);
    console.log("Registros de imagens excluídos do banco:", dbResponse);
    await deleteGalleryFromDb({ id: galleryId });
    revalidatePath("/admin");

    return { message: "Galeria e imagens excluídas com sucesso." };
  } catch (error) {
    console.error("Erro ao excluir a galeria:", error);
    throw new Error("Erro ao excluir a galeria.");
  }
}
