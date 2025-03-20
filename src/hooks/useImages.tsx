import { getImagesByGalleryId } from "@/app/controllers/images";
import { useQuery } from "@tanstack/react-query";

export const useImages = ({ galleryId }: { galleryId: string }) => {
  const images = useQuery({
    queryKey: ["images", galleryId],
    queryFn: () => getImagesByGalleryId(galleryId),
  });

  return images;
};
