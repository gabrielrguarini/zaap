-- CreateEnum
CREATE TYPE "ImagePosition" AS ENUM ('TOP', 'BOTTOM', 'CENTER', 'LEFT', 'RIGHT');

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "imagePosition" "ImagePosition";
