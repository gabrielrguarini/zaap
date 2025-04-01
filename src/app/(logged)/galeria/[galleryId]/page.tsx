"use server";

import { SessionProvider } from "next-auth/react";
import GalleryImages from "./_components/gallery-images";
import { auth } from "@/auth";
import { getGalleryById } from "@/app/controllers/gallery";
import Link from "next/link";
import Image from "next/image";

export default async function GalleryPage({
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
          <h1 className="text-6xl font-bold">{gallery.title}</h1>
          <GalleryImages galleryId={galleryId} />
        </div>
        <Link
          href="https://wa.me/+553284238232/"
          className="text-blue-500 underline"
        >
          <Image
            src={"/FALE CONOSCO ZAAP.png"}
            alt="Fale conosco pelo Whatsapp"
            height={111}
            width={1113}
          />
        </Link>
      </main>
    </SessionProvider>
  );
}
