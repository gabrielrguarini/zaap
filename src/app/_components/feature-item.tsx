import Image from "next/image";

interface FeatureItemProps {
  imageString: string;
  title: string;
  subTitle: string;
}

const FeatureItem = ({ imageString, title, subTitle }: FeatureItemProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div
        className={`relative h-[42px] ${imageString === "/features/premium.png" ? "w-[31px]" : "w-[52px]"}`}
      >
        <Image src={imageString} alt={"truck"} fill />
      </div>
      <div className="leading-3">
        <p>{title}</p>
        <span className="text-xss">{subTitle}</span>
      </div>
    </div>
  );
};

export default FeatureItem;
