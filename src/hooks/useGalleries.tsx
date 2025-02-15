import { useQuery } from "@tanstack/react-query";
import { getGalleries } from "@/app/controllers/gallery";

export const useGalleries = () => {
  return useQuery({
    queryKey: ["galleries"],
    queryFn: () => getGalleries({ search: "" }),
  });
};
