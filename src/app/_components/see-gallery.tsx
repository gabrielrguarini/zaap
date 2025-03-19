"use client";

import { useState } from "react";
import { getGalleryById } from "../controllers/gallery";
import { useRouter } from "next/navigation";

export const SeeGallery = () => {
  const [gallery, setGallery] = useState("");
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Digite o código"
        className="rounded bg-foreground p-2 text-white"
        maxLength={6}
        value={gallery}
        onChange={(e) => setGallery(e.target.value)}
      />
      <button
        onClick={async () => {
          const galleryFromDb = await getGalleryById(gallery);
          if (galleryFromDb) {
            router.push(`/galeria/${gallery}`);
          }
        }}
        className="text-bold mt-4 rounded bg-primary px-4 py-2"
      >
        Ver galeria
      </button>
    </div>
  );
};
