import Image from "next/image";
import Logo from "./logo";

const HeroSlider = () => {
  return (
    <div className="relative h-[324px] w-[1024px]">
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <Image src={"/HeroSlider.png"} alt={"Hero Slider"} fill />
    </div>
  );
};

export default HeroSlider;
