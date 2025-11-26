import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { generatePresignedUrl } from "@/utils/generate-presigned-url";
import { compressImage } from "@/utils/compress-image";

interface UploadData {
  galleryId: string;
  files: File[];
}

interface PresignedUrlData {
  presignedUrl: string;
  key: string;
}

async function uploadToS3(
  compressedFiles: File[],
  presignedUrls: PresignedUrlData[],
): Promise<string[]> {
  const uploadPromises = presignedUrls.map(async (urlData, index) => {
    const file = compressedFiles[index];
    return axios
      .put(urlData.presignedUrl, file, {
        headers: { "Content-Type": file.type },
      })
      .then(() => urlData.key);
  });

  return Promise.all(uploadPromises);
}

export const useUploadImages = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const mutation = useMutation<string[], Error, UploadData>({
    mutationFn: async ({ galleryId, files }) => {
      if (files.length === 0) {
        throw new Error("Nenhum arquivo selecionado");
      }
      setStatusMessage("Comprimindo imagens...");
      const compressedFiles = await Promise.all(
        files.map((file) => compressImage({ file })),
      );
      setStatusMessage("Obtendo URLs de upload...");
      const { urls } = await generatePresignedUrl({
        galleryId,
        files: compressedFiles.map((file) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      if (!urls) {
        throw new Error("Erro ao obter URLs pré-assinadas");
      }
      setStatusMessage("Enviando imagens...");
      const uploadedKeys = await uploadToS3(compressedFiles, urls);

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
