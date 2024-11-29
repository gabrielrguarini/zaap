import Image from "next/image";
import Logo from "./logo";

interface HeroSliderProps {
  src: string;
  alt: string;
}

const HeroSlider = ({ src, alt }: HeroSliderProps) => {
  return (
    <div className="relative">
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <Image src={src} alt={alt} height={324} width={1024} />
    </div>
  );
};

export default HeroSlider;
