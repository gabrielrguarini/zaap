import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface ImageProps {
  url: string;
  description: string;
}

const PhotoGallery = ({ images }: { images: ImageProps[] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (event.key === "ArrowRight") {
          setSelectedImageIndex((prev) =>
            prev !== null ? (prev + 1) % images.length : 0,
          );
        } else if (event.key === "ArrowLeft") {
          setSelectedImageIndex((prev) =>
            prev !== null
              ? (prev - 1 + images.length) % images.length
              : images.length - 1,
          );
        } else if (event.key === "Escape") {
          setSelectedImageIndex(null);
        }
      }
    },
    [selectedImageIndex, images],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setSwipeOffset(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      if (deltaX > 50) {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : 0,
        );
      } else if (deltaX < -50) {
        setSelectedImageIndex((prev) =>
          prev !== null
            ? (prev - 1 + images.length) % images.length
            : images.length - 1,
        );
      }
    }
    setTouchStartX(null);
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#171717] p-8 text-white">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.url}
            alt={img.description}
            width={200}
            height={128}
            className="h-32 w-full cursor-pointer rounded-md object-cover hover:opacity-80"
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImageIndex(null);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="absolute right-4 top-4 text-white"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-primary lg:left-4"
            onClick={() =>
              setSelectedImageIndex(
                (selectedImageIndex - 1 + images.length) % images.length,
              )
            }
          >
            <ChevronLeft size={48} />
          </button>
          <Image
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].description}
            width={900}
            height={600}
            style={{
              transform: `translateX(${swipeOffset}px)`,
              transition: isSwiping ? "none" : "transform 0.3s ease-out",
            }}
            className="max-h-[80vh] max-w-[100%] rounded-lg"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary lg:right-4"
            onClick={() =>
              setSelectedImageIndex((selectedImageIndex + 1) % images.length)
            }
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
