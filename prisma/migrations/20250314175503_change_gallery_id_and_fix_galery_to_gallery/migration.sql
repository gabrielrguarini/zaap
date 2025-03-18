/*
  Warnings:

  - You are about to drop the column `galeryId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `Galery` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `galleryId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Galery" DROP CONSTRAINT "Galery_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_galeryId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "galeryId",
ADD COLUMN     "galleryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Galery";

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "location" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "authorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
