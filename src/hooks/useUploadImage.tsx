import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { generatePresignedUrl } from "@/utils/generate-presigned-url";

interface UploadData {
  galleryId: string;
  files: File[];
}

export const useUploadImages = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const mutation = useMutation<string[], Error, UploadData>({
    mutationFn: async ({ galleryId, files }) => {
      if (files.length === 0) throw new Error("Nenhum arquivo selecionado");

      setStatusMessage("Obtendo URLs de upload...");
      const dataUrl = await generatePresignedUrl({
        galleryId,
        files: files.map((file) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      if (!dataUrl.urls) throw new Error("Erro ao obter URLs pré-assinadas");

      setStatusMessage("Enviando imagens...");
      const uploadPromises = dataUrl.urls.map((urlObj, index) =>
        axios
          .put(urlObj.presignedUrl, files[index], {
            headers: { "Content-Type": files[index].type },
          })
          .then(() => urlObj.key),
      );

      const uploadedKeys = await Promise.all(uploadPromises);

      return uploadedKeys;
    },
    onSuccess: () => {
      setStatusMessage("Imagens enviadas com sucesso!");
    },
    onError: (error) => {
      setStatusMessage(`Erro ao enviar imagens: ${error.message}`);
    },
  });

  return {
    ...mutation,
    statusMessage,
  };
};
