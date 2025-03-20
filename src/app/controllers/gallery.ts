"use server";

import { prisma } from "@/utils/prisma";
import { auth } from "@/auth";

export interface CreateGalleryProps {
  id: string;
  title: string;
  type: string;
  location: string;
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
      imageUrl: `https://zaap-bucket.s3.sa-east-1.amazonaws.com/${image}`,
      authorId: 1,
    },
  });
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
export async function getGalleries({ search }: { search: string }) {
  const galleries = await prisma.gallery.findMany({
    take: 5,
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return galleries;
}
