"use server";
import { s3 } from "@/utils/s3Client";
import { env } from "@/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface FilesProps {
  galleryId: string;
  files: {
    fileName: string;
    fileType: string;
  }[];
}

export async function generatePresignedUrl({ galleryId, files }: FilesProps) {
  const urls = await Promise.all(
    files.map(async (file) => {
      const key = `${galleryId}/${file.fileName}-${Date.now()}`;

      const command = new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: file.fileType,
      });

      const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

      return { presignedUrl, key };
    }),
  );

  return { urls };
}
