import { s3 } from "@/app/s3Client";
import { env } from "@/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth.protect();
  const { files } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  return NextResponse.json({ urls });
}
