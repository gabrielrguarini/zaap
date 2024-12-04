"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Logo from "./logo";
import { useEffect } from "react";

interface HeroSliderProps {
  slides: [
    {
      src: string;
      alt: string;
      title?: string;
      subTitle?: string;
      item?: string;
    },
  ];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 100,
    });
  }, []);
  return (
    <div className="relative h-[424px] w-full" data-aos="zoom-in">
      <Logo className="absolute left-[50%] top-[-84px] z-10 translate-x-[-50%]" />
      <Image
        className="rounded-3xl"
        src={slides[0].src}
        alt={slides[0].alt}
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 overflow-hidden p-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <div
              className="max-w-[380px]"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <h3 className="text-3xl font-semibold leading-none">
                Seu evento com{" "}
                <span className="font-bold text-primary">sonorização</span> da
                mais alta qualidade!
              </h3>
              <p className="text-xl">{slides[0].subTitle}</p>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-end gap-4">
            <Image
              src={"/estrutura.png"}
              alt={"Som"}
              width={80}
              height={400}
              data-aos="fade-right"
              data-aos-delay="500"
            />
            <Image
              className=""
              src={"/som.png"}
              alt={"Som"}
              width={200}
              height={183}
              data-aos="fade-down"
              data-aos-delay="500"
            />
            <Image
              src={"/luz.png"}
              alt={"Som"}
              width={120}
              height={183}
              data-aos="fade-left"
              data-aos-delay="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
