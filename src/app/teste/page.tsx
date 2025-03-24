"use client";
import { useImages } from "@/hooks/useImages";
import PhotoGallery from "../_components/GalleryTeste";

export default function Teste() {
  const { data } = useImages({ galleryId: "TD79TN" });
  if (!data) return null;
  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="mb-8 text-3xl font-bold text-primary">
        Galeria de Imagens
      </h1>

      <PhotoGallery images={data} />
    </div>
  );
}
