"use server";
import { getImages } from "@/app/controllers/images";
import Image from "next/image";
import { Suspense } from "react";
import ImageIcon from "./min-icon";

export default async function GaleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: galleryId } = await params;
  const images = getImages(galleryId);
  return (
    <main className="m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 md:gap-4">
      <div>
        <div className="flex flex-col gap-2">
          <div className={`relative h-72`}>
            <Image
              src={"/galery-list/0.jpg"}
              alt={"Search"}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Suspense fallback={<div>Carregando...</div>}>
              <ImageIcon images={images} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
