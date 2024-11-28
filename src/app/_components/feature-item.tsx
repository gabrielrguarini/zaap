import Image from "next/image";

interface FeatureItemProps {
  src: string;
  title: string;
  subTitle: string;
  alt: string;
}

const FeatureItem = ({ src, title, subTitle, alt }: FeatureItemProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Image src={src} alt={alt} height={42} width={52} />

      <div className="leading-3">
        <p>{title}</p>
        <span className="text-xss">{subTitle}</span>
      </div>
    </div>
  );
};

export default FeatureItem;
