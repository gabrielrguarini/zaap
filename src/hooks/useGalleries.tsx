import { useQuery } from "@tanstack/react-query";
import { getGalleries } from "@/app/controllers/gallery";

export const useGalleries = (search: string, isPublicFilter?: boolean) => {
  return useQuery({
    queryKey: ["galleries", search, isPublicFilter],
    queryFn: () => getGalleries({ search, isPublicFilter }),
  });
};
