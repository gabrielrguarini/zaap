"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import Link from "next/link";

const images = [
  "/insta1.png",
  "/insta2.png",
  "/insta3.png",
  "/som.png",
  "/estrutura.png",
  "/luz.png",
  "/insta1.png",
  "/insta2.png",
  "/insta3.png",
];
const IMAGES_PER_PAGE = 3;
const AUTO_SLIDE_INTERVAL = 4000; // 4s

export default function InstagramCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [totalPages]);

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  return (
    <div className="bg-[#171717] px-4 py-12 text-center text-white">
      <h2 className="bg-gradient-to-r from-[#ffb400] to-primary bg-clip-text text-lg uppercase tracking-widest text-transparent">
        Fique por dentro das
      </h2>
      <h3 className="m-auto mb-2 bg-gradient-to-r from-[#ffb400] to-primary bg-clip-text text-center text-3xl font-bold text-transparent">
        Novidades na Zaap Eventos!
      </h3>
      <div className="mx-auto mb-6 h-1 w-16 rounded bg-white" />

      <div className="relative mx-auto w-full max-w-6xl overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {[...Array(totalPages)].map((_, pageIndex) => {
            const pageImages = images.slice(
              pageIndex * IMAGES_PER_PAGE,
              pageIndex * IMAGES_PER_PAGE + IMAGES_PER_PAGE,
            );

            return (
              <div
                key={pageIndex}
                className="flex w-full shrink-0 justify-center gap-6 px-4"
              >
                {pageImages.map((src, i) => (
                  <Link
                    href="https://www.instagram.com/zaapeventos/"
                    target="_blank"
                    key={i}
                    className="overflow-hidden rounded-lg border-2 border-orange-500 shadow-lg"
                  >
                    <Image
                      src={src}
                      alt={`Imagem ${pageIndex * IMAGES_PER_PAGE + i}`}
                      width={300}
                      height={300}
                      className="h-[300px] w-[300px] object-cover"
                    />
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-4 mt-6 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentPage === index ? "bg-orange-500" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <Link
        href={"https://www.instagram.com/zaapeventos/"}
        className="flex items-center justify-center gap-2 text-xl font-bold text-orange-500"
      >
        <Instagram className="size-20 text-[#ffb400]" />
        <span className="bg-gradient-to-r from-[#ffb400] to-primary bg-clip-text text-4xl text-transparent">
          @zaapeventos
        </span>
      </Link>
    </div>
  );
}
