import Image from "next/image";
import Logo from "../../logo";

interface HeroSliderProps {
  event: {
    src: string;
    title: string;
    type: string;
    locale: string;
    date: string;
    position?: string;
  };
}

const GaleryHeroSlider = ({ event }: HeroSliderProps) => {
  return (
    <div className="relative h-[424px] w-[1024px]">
      <div
        className={`opacity-1 absolute inset-0 z-10 rounded-3xl bg-gradient-to-r from-black via-black/40 to-black`}
      ></div>
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-center rounded-3xl px-10`}
      >
        <p className="mr-auto whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-start text-6xl font-bold text-transparent">
          {event.title}
        </p>
        <p className="text-3xl font-bold">
          {event.type} <span className="font-light">- {event.locale}</span>
        </p>
        <span className="text-xs font-light">{event.date}</span>
      </div>
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <div className="absolute left-[20%] top-[30%] z-20 translate-x-[-50%] whitespace-nowrap leading-3"></div>
      <Image
        className="rounded-3xl"
        src={event.src}
        alt={event.title}
        fill
        style={{ objectFit: "cover", objectPosition: event.position }}
      />
    </div>
  );
};

export default GaleryHeroSlider;