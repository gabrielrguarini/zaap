import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

const ImageIcon = ({ images }: { images: ImageType[] }) => {
  return images.map((img, index) => {
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
