"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Logo from "./logo";
import { useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
  title?: string;
  subTitle?: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 100,
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const imagePositions = ["estrutura", "som", "luz"];

  return (
    <div
      className="relative mt-10 h-[224px] w-full p-4 sm:my-0 lg:h-[424px]"
      data-aos="zoom-in"
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const position = (index - currentIndex + slides.length) % slides.length;
        let positionClasses = "";

        if (position === 0) {
          positionClasses =
            "translate-x-0 scale-100 z-10 opacity-100 duration-[2000ms]";
        } else if (position === 1) {
          positionClasses =
            "translate-x-full scale-75 z-0 opacity-75 duration-[2000ms]";
        } else if (position === slides.length - 1) {
          positionClasses =
            "-translate-x-full scale-75 z-0 opacity-75 duration-[2000ms]";
        } else {
          positionClasses = "translate-x-[300%] opacity-0";
        }

        return (
          <div key={index}>
            <Logo className="absolute left-[50%] top-[-20%] z-20 translate-x-[-50%] lg:top-[-20%]" />

            <div
              className={`absolute left-0 top-0 flex h-full w-full transition-all ${positionClasses}`}
            >
              <Image
                className="rounded-3xl"
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 overflow-hidden px-8">
                {position === 0 && (
                  <div className="flex h-full flex-col items-center justify-center sm:grid sm:grid-cols-2">
                    <div className="flex flex-col justify-center">
                      <div
                        className="max-w-[380px]"
                        data-aos="zoom-in"
                        data-aos-delay="1000"
                        data-aos-duration="2000"
                      >
                        <h3 className="text-3xl font-semibold leading-none">
                          Seu evento com{" "}
                          <span className="font-bold text-primary">
                            sonorização
                          </span>{" "}
                          da mais alta qualidade!
                        </h3>
                        <p className="text-xl">{slide.subTitle}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="relative hidden h-[224px] w-full overflow-hidden sm:flex lg:h-[424px]">
        {imagePositions.map((image, index) => {
          const relativePosition =
            (index - currentIndex + imagePositions.length) %
            imagePositions.length;

          const translateX = relativePosition * 100;
          const scale = relativePosition === 1 ? 1 : 0.75;

          const zIndex =
            relativePosition === 1 ? 20 : relativePosition === 0 ? 10 : 10;

          return (
            <div
              key={image}
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) translateX(-50%) translateY(-50%)`,
                zIndex,
              }}
              className="absolute left-1/2 top-1/2 h-[183px] w-[120px] transition-all duration-[2000ms] ease-in-out lg:h-[300px] lg:w-[200px]"
            >
              <Image
                src={`/${image}.png`}
                alt={image}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;
