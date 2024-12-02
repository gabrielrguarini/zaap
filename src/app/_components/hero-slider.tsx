import Image from "next/image";
import Logo from "./logo";

interface HeroSliderProps {
  src: string;
  alt: string;
}

const HeroSlider = ({ src, alt }: HeroSliderProps) => {
  return (
    <div className="relative h-[324px] w-[1024px]">
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <Image
        className="rounded-3xl"
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default HeroSlider;
