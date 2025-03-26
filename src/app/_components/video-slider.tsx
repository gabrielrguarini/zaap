"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videoSlides = [
  "video/videoCasamento.mp4",
  "video/videoEvento.mp4",
  "video/videoEvento2.mp4",
];

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    startVideo();
  }, [currentIndex]);

  const startVideo = () => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0;
          video.play();
          video.onended = nextSlide;
        } else {
          video.pause();
        }
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videoSlides.length) % videoSlides.length,
    );
  };

  return (
    <div className="relative w-full p-2 md:p-8">
      <ChevronLeft
        onClick={prevSlide}
        className="absolute left-0 top-[50%] z-20 translate-x-[50%] cursor-pointer lg:-left-12"
      />
      <ChevronRight
        onClick={nextSlide}
        className="absolute right-0 top-[50%] z-20 translate-x-[-50%] cursor-pointer lg:-right-12"
      />
      <div className="relative h-[224px] w-full md:h-[424px]">
        {videoSlides.map((video, index) => {
          const position =
            (index - currentIndex + videoSlides.length) % videoSlides.length;
          let positionClasses = "";

          if (position === 0) {
            positionClasses =
              "translate-x-0 scale-100 z-10 opacity-100 duration-[2000ms]";
          } else if (position === 1) {
            positionClasses =
              "translate-x-full scale-75 z-0 opacity-75 duration-[2000ms]";
          } else if (position === videoSlides.length - 1) {
            positionClasses =
              "-translate-x-full scale-75 z-0 opacity-75 duration-[2000ms]";
          } else {
            positionClasses = "translate-x-[300%] opacity-0";
          }

          return (
            <video
              key={index}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              className={`absolute left-0 top-0 h-full w-full rounded-3xl object-cover shadow-2xl shadow-black transition-all ${positionClasses}`}
              muted
              controls
              preload={position === 0 ? "auto" : "none"}
            >
              <source src={video} type="video/mp4" />
            </video>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSlider;
