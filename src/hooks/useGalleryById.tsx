import { getGalleryById } from "@/app/controllers/gallery";
import { useQuery } from "@tanstack/react-query";

export function useGalleryById(galleryId: string) {
  return useQuery({
    queryKey: ["gallery", galleryId],
    queryFn: () => {
      if (!galleryId) throw new Error("galleryId is required");
      return getGalleryById(galleryId);
    },
  });
}
