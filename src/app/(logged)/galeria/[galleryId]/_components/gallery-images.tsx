"use client";
import Image from "next/image";
import ImageIcon from "./min-icon";
import { useImages } from "@/hooks/useImages";
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
        <ImageIcon images={images} />
      </div>
    </div>
  );
};

export default GalleryImages;
