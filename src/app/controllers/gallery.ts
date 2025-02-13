"use server";

import { prisma } from "@/utils/prisma";

export interface CreateGalleryProps {
  title: string;
  type: string;
  location: string;
  image: string;
  date?: Date | undefined;
}

export async function createGallery(data: CreateGalleryProps) {
  const { title, type, location, date, image } = data;
  await prisma.galery.create({
    data: {
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
  const galery = await prisma.galery.findMany({ where: { authorId } });
  return galery;
}

export async function getGalleries({ search }: { search: string }) {
  const galleries = await prisma.galery.findMany({
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
