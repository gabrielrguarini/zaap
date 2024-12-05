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
    <div
      className="relative h-[224px] w-full p-4 lg:h-[424px]"
      data-aos="zoom-in"
    >
      <Logo className="absolute left-[50%] top-[-20%] z-10 translate-x-[-50%] lg:top-[-20%]" />
      <Image
        className="rounded-3xl"
        src={slides[0].src}
        alt={slides[0].alt}
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 overflow-hidden px-8">
        <div className="flex h-full flex-col items-center justify-center sm:grid sm:grid-cols-2">
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
          <div className="hidden h-[224px] w-full items-center justify-end gap-4 sm:flex lg:h-[424px]">
            <div className="relative h-[300px] w-[60px] lg:h-[240px] lg:w-[90px]">
              <Image
                src={"/estrutura.png"}
                alt={"Som"}
                fill
                style={{ objectFit: "contain" }}
                data-aos="fade-right"
                data-aos-delay="500"
              />
            </div>
            <div className="relative h-[225px] w-[100px] lg:h-[450px] lg:w-[200px]">
              <Image
                className=""
                src={"/som.png"}
                alt={"Som"}
                fill
                style={{ objectFit: "contain" }}
                data-aos="fade-down"
                data-aos-delay="500"
              />
            </div>
            <div className="relative h-[183px] w-[120px]">
              <Image
                src={"/luz.png"}
                alt={"Som"}
                fill
                style={{ objectFit: "contain" }}
                data-aos="fade-left"
                data-aos-delay="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
