"use client";
import { useImages } from "@/hooks/useImages";
import PhotoGallery from "@/app/_components/GalleryTeste";
const GalleryImages = ({ galleryId }: { galleryId: string }) => {
  const { data, isLoading } = useImages({ galleryId });
  if (isLoading) return <h1>Carregando...</h1>;
  if (!data || data.length === 0) return;
  return <PhotoGallery images={data} />;
};

export default GalleryImages;
