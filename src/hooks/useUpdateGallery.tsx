import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGallery, UpdateGalleryProps } from "@/app/controllers/gallery";
import { useState } from "react";

export const useUpdateGallery = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const queryCliente = useQueryClient();
  const mutation = useMutation<void, Error, UpdateGalleryProps>({
    mutationFn: async (data) => {
      await updateGallery(data);
    },
    onSuccess: () => {
      setStatusMessage("Evento atualizado com sucesso!");
      queryCliente.invalidateQueries({ queryKey: ["galleries"] });
      queryCliente.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: (error) => {
      setStatusMessage(`Erro ao atualizar evento: ${error.message}`);
    },
  });

  return {
    ...mutation,
    statusMessage,
  };
};
