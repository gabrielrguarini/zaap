import { prisma } from "@/utils/prisma";

export const resetDb = async () => {
  await prisma.image.deleteMany();
  await prisma.gallery.deleteMany();
};
