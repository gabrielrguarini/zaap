import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGallery, CreateGalleryProps } from "@/app/controllers/gallery";
import { useState } from "react";

export const useCreateGallery = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const queryCliente = useQueryClient();
  const mutation = useMutation<void, Error, CreateGalleryProps>({
    mutationFn: async (data) => {
      await createGallery(data);
    },
    onSuccess: () => {
      setStatusMessage("Evento salvo com sucesso!");
      queryCliente.invalidateQueries({ queryKey: ["galleries"] });
    },
    onError: (error) => {
      setStatusMessage(`Erro ao salvar evento: ${error.message}`);
    },
  });

  return {
    ...mutation,
    statusMessage,
  };
};
