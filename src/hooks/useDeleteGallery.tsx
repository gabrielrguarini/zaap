"use client";
import { deleteGallery } from "@/app/controllers/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGallery = ({ galleryId }: { galleryId: string }) => {
  const queryCliente = useQueryClient();
  const gallery = useMutation({
    mutationFn: () => deleteGallery(galleryId),
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["galleries"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return gallery;
};
