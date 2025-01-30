import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

const ImageIcon = async ({ images }: { images: Promise<ImageType[]> }) => {
  const imagesAwait = await images;
  return imagesAwait.map((img, index) => {
    return (
      <Image
        key={index}
        src={img.url}
        alt={"Search"}
        width={160}
        height={120}
        className="object-contain"
      />
    );
  });
};

export default ImageIcon;
