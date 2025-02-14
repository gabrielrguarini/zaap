import { useMutation } from "@tanstack/react-query";
import { createGallery, CreateGalleryProps } from "@/app/controllers/gallery";
import { useState } from "react";

export const useCreateGallery = () => {
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useMutation<void, Error, CreateGalleryProps>({
    mutationFn: async (data) => {
      await createGallery(data);
    },
    onSuccess: () => {
      setMessage("Evento salvo com sucesso!");
    },
    onError: (error) => {
      setMessage(`Erro ao salvar evento: ${error.message}`);
    },
  });

  return {
    createGallery: mutation.mutateAsync,
    isCreating: mutation.isPending,
    message,
  };
};
