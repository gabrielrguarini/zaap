"use client";
import { createGallery } from "@/app/controllers/gallery";
import { gallerySchema, GallerySchema } from "./gallerySchema";
import { useForm } from "react-hook-form";
import { generatePresignedUrl } from "../upload/generate-presigned-url";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export const GalleryForm = () => {
  const { register, handleSubmit, reset } = useForm<GallerySchema>();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const uploadImagesMutation = useMutation({
    mutationFn: async (data: GallerySchema) => {
      setStatusMessage("Enviando imagens...");
      const safeData = gallerySchema.safeParse({
        ...data,
        date: data.date && new Date(data.date),
      });

      if (!safeData.success) {
        throw new Error("Dados inválidos");
      }

      const dataUrl = await generatePresignedUrl({
        files: safeData.data.image.map((file: File) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      const { urls } = dataUrl;

      if (!urls) {
        throw new Error("Erro ao obter URLs pré-assinadas");
      }

      const uploadPromises = urls.map((urlObj, index) =>
        axios
          .put(urlObj.presignedUrl, safeData.data.image[index], {
            headers: { "Content-Type": safeData.data.image[index].type },
          })
          .then(() => urlObj.key),
      );

      const uploadedKeys = await Promise.all(uploadPromises);

      return { ...safeData.data, image: uploadedKeys[0] };
    },
    onSuccess: (data) => {
      setStatusMessage("Salvando evento...");
      createGalleryMutation.mutate(data);
    },
    onError: () => {
      setStatusMessage("Erro ao enviar imagens");
    },
  });

  const createGalleryMutation = useMutation({
    mutationFn: async (data: GallerySchema) => {
      await createGallery(data);
    },
    onSuccess: () => {
      setStatusMessage("Evento salvo com sucesso!");
      reset();
    },
    onError: () => {
      setStatusMessage("Erro ao salvar evento");
    },
  });

  const onSubmit = (data: GallerySchema) => {
    uploadImagesMutation.mutate(data);
  };
  const isSubmitting =
    uploadImagesMutation.isPending || createGalleryMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Nome da festa"
        className="rounded bg-foreground p-2 text-white"
      />
      <input
        type="text"
        {...register("type")}
        placeholder="Tipo de festa"
        className="rounded bg-foreground p-2 text-white"
      />
      <input
        type="text"
        {...register("location")}
        placeholder="Local da festa"
        className="rounded bg-foreground p-2 text-white"
      />
      <input
        type="date"
        {...register("date")}
        className="rounded bg-foreground p-2 text-white"
      />
      <input
        type="file"
        {...register("image")}
        className="rounded bg-foreground p-2 text-white"
      />
      <button
        className="text-bold rounded bg-primary px-4 py-2"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </button>
      {statusMessage && <p className="text-white">{statusMessage}</p>}
    </form>
  );
};
