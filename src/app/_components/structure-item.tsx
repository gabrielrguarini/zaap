import Image from "next/image";

interface StructureItemProps {
  src: string;
  alt: string;
  title: string;
}

const StructureItem = ({ src, alt, title }: StructureItemProps) => {
  return (
    <div className="ml-4 flex flex-col items-center">
      <div className="flex flex-1 items-center">
        <Image src={src} height={100} width={100} alt={alt} />
      </div>
      <p className="mt-2 text-center">{title}</p>
    </div>
  );
};

export default StructureItem;
