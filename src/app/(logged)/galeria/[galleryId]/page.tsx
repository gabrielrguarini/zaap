"use server";

import { SessionProvider } from "next-auth/react";
import GalleryImages from "./_components/gallery-images";
import { auth } from "@/auth";
import { getGalleryById } from "@/app/controllers/gallery";

export default async function GaleryPage({
  params,
}: {
  params: Promise<{ galleryId: string }>;
}) {
  const { galleryId: galleryId } = await params;
  const gallery = await getGalleryById(galleryId);
  const session = await auth();

  if (!gallery) {
    return <h1 className="text-2xl">Galeria não encontrada</h1>;
  }
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
