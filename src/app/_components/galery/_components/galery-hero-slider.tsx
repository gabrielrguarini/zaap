import Image from "next/image";
import Logo from "../../logo";
import { useEffect, useState } from "react";
import { Galery } from "@prisma/client";

interface HeroSliderProps {
  event: Galery;
}

const GaleryHeroSlider = ({ event }: HeroSliderProps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [event]);
  if (!event) return null;
  return (
    <div className="relative h-[212px] w-full lg:h-[424px]">
      <div
        className={`opacity-1 absolute inset-0 z-10 rounded-3xl bg-gradient-to-r from-black via-black/40 to-black`}
      ></div>
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-center rounded-3xl px-10 ${animate ? "animate-fade-up" : ""}`}
      >
        <p className="mr-auto whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-start text-6xl font-bold text-transparent">
          {event.title}
        </p>
        <p className="text-3xl font-bold">
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
        className="rounded-3xl"
        src={`${event.imageUrl}`}
        alt={event.title}
        fill
        style={{ objectFit: "cover", objectPosition: "contain" }}
      />
    </div>
  );
};

export default GaleryHeroSlider;
