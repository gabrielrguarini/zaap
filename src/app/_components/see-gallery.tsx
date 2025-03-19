"use client";

import { useState } from "react";
import { getGalleryById } from "../controllers/gallery";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

export const SeeGallery = () => {
  const [gallery, setGallery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const galleryFromDb = await getGalleryById(gallery);
    if (!galleryFromDb) {
      toast.error("Galeria não encontrada");
      setIsLoading(false);
      return;
    }
    router.push(`/galeria/${galleryFromDb.id}`);
  };
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Digite o código"
        className="rounded bg-foreground p-2 text-white"
        maxLength={6}
        value={gallery}
        onChange={(e) => setGallery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        className={`text-bold mt-4 flex justify-center rounded px-4 py-2 ${isLoading ? "bg-gray-600" : "bg-primary hover:opacity-90"}`}
        disabled={isLoading}
      >
        {isLoading && <LoaderIcon className="mx-2 animate-spin" />} Ver galeria
      </button>
    </div>
  );
};
