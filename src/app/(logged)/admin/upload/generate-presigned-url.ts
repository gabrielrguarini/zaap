"use server";
import { s3 } from "@/utils/s3Client";
import { env } from "@/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";

interface FilesProps {
  files: {
    fileName: string;
    fileType: string;
  }[];
}

export async function generatePresignedUrl({ files }: FilesProps) {
  const { userId } = await auth.protect();
  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }

  const urls = await Promise.all(
    files.map(async (file: { fileName: string; fileType: string }) => {
      const key = `${file.fileName}-${Date.now()}`;

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
