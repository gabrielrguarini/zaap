import Image from "next/image";
import Logo from "./logo";

const HeroSlider = () => {
  return (
    <div className="relative">
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <Image
        src={"/HeroSlider.png"}
        alt={"Hero Slider"}
        height={324}
        width={1024}
      />
    </div>
  );
};

export default HeroSlider;
