"use client";
import { Image as ImageType } from "@prisma/client";
import { MinIcon } from "./min-icon";
import { Dispatch, SetStateAction } from "react";

const ImageIconList = ({
  images,
  setImageSelected,
}: {
  images: ImageType[];
  setImageSelected: Dispatch<SetStateAction<number>>;
}) => {
  return images.map((img, index) => {
    return (
      <MinIcon
        key={index}
        src={img.url}
        id={img.id}
        setImageSelected={setImageSelected}
        index={index}
      />
    );
  });
};

export default ImageIconList;
