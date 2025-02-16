"use server";

import GalleryImages from "./_components/gallery-images";

export default async function GaleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: galleryId } = await params;
  return (
    <main className="m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 md:gap-4">
      <div>
        <GalleryImages galleryId={galleryId} />
      </div>
    </main>
  );
}
