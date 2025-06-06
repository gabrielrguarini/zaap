import Image from "next/image";
import Logo from "../../logo";
import { useEffect, useState } from "react";
import { Gallery, ImagePosition } from "@prisma/client";

interface HeroSliderProps {
  event: Gallery;
}
const imagePositionClasses: Record<ImagePosition, string> = {
  TOP: "object-top",
  BOTTOM: "object-bottom",
  CENTER: "object-center",
  LEFT: "object-left",
  RIGHT: "object-right",
  LEFT_TOP: "object-left-top",
  RIGHT_TOP: "object-right-top",
  LEFT_BOTTOM: "object-left-bottom",
  RIGHT_BOTTOM: "object-right-bottom",
};

function getImagePositionClass(position?: ImagePosition | null): string {
  return position ? imagePositionClasses[position] : "object-center";
}

const GalleryHeroSlider = ({ event }: HeroSliderProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [event]);
  if (!event) return null;
  console.log("event position -> ", event.imagePosition);
  console.log("Função -> ", getImagePositionClass(event.imagePosition));
  return (
    <div className="relative h-[212px] w-full lg:h-[424px]">
      <div
        className={`opacity-1 absolute inset-0 z-10 rounded-3xl bg-gradient-to-r from-black via-black/40 to-black`}
      ></div>
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-center rounded-3xl px-5 sm:px-10 ${animate ? "animate-fade-up" : ""}`}
      >
        <p className="mr-auto whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-start text-5xl font-bold text-transparent sm:text-6xl">
          {event.title}
        </p>
        <p className="text-2xl font-bold leading-5 sm:text-3xl">
          {event.type} <span className="font-light">- {event.location}</span>
        </p>
        <span className="text-xs font-light">
          {event.date?.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </span>
      </div>
      <Logo className="absolute left-[50%] top-[-20%] z-10 translate-x-[-50%]" />
      <div className="absolute left-[20%] top-[30%] z-20 translate-x-[-50%] whitespace-nowrap leading-3"></div>
      <Image
        className={`rounded-3xl object-cover ${getImagePositionClass(event.imagePosition)}`}
        src={`${event.imageUrl}`}
        alt={event.title}
        fill
      />
    </div>
  );
};

export default GalleryHeroSlider;
