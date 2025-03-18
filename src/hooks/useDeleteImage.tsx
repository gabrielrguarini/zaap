"use client";
import { deleteImage } from "@/app/controllers/images";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteImage = ({ imageId }: { imageId: string }) => {
  const queryCliente = useQueryClient();
  const images = useMutation({
    mutationFn: () => deleteImage(imageId),
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["images"] });
    },
  });

  return images;
};
