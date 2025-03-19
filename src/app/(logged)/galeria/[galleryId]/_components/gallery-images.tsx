"use client";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";
import ImageIconList from "./min-icon-list";
import { useState } from "react";
const GalleryImages = ({ galleryId }: { galleryId: string }) => {
  const { data: images, isLoading } = useImages({ galleryId });
  const [imageSelected, setImageSelected] = useState(0);
  if (isLoading) return <h1>Carregando...</h1>;
  if (!images || images.length === 0) return;
  console.log("galleryId ->", galleryId);
  console.log("Images[0] ->", images[0]);
  return (
    <div className="flex flex-col gap-2">
      <div className={`relative h-72`}>
        <Image
          src={images[imageSelected].url}
          alt={"Search"}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <ImageIconList images={images} setImageSelected={setImageSelected} />
      </div>
    </div>
  );
};

export default GalleryImages;
