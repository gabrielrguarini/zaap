"use server";

import { SessionProvider } from "next-auth/react";
import GalleryImages from "./_components/gallery-images";
import { auth } from "@/auth";

export default async function GaleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: galleryId } = await params;
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main className="m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 md:gap-4">
        <div>
          <GalleryImages galleryId={galleryId} />
        </div>
      </main>
    </SessionProvider>
  );
}
