"use client";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";
import ImageIconList from "./min-icon-list";
const GalleryImages = ({ galleryId }: { galleryId: string }) => {
  const { data: images, isLoading } = useImages({ galleryId });
  if (isLoading) return <h1>Carregando...</h1>;
  if (!images) return;
  return (
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
        <ImageIconList images={images} />
      </div>
    </div>
  );
};

export default GalleryImages;
