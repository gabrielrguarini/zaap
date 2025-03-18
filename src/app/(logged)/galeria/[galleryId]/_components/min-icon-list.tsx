"use client";
import { Image as ImageType } from "@prisma/client";
import { MinIcon } from "./min-icon";

const ImageIconList = ({ images }: { images: ImageType[] }) => {
  return images.map((img, index) => {
    return <MinIcon key={index} src={img.url} id={img.id} />;
  });
};

export default ImageIconList;
