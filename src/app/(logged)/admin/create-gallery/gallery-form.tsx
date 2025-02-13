"use client";
import { createGallery, CreateGalleryProps } from "@/app/controllers/gallery";
import { gallerySchema, GallerySchema } from "./gallerySchema";
import { useForm } from "react-hook-form";
import { generatePresignedUrl } from "../upload/generate-presigned-url";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export const GalleryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GallerySchema>({
    resolver: zodResolver(gallerySchema),
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const uploadImagesMutation = useMutation({
    mutationFn: async (data: GallerySchema) => {
      setStatusMessage("Enviando imagens...");
      console.log("data ->", data);
      const safeData = gallerySchema.safeParse(data);

      console.log("safeData ->", safeData);
      if (!safeData.success) {
        throw new Error("Dados inválidos");
      }
      console.log("safeData.data ->", safeData.data);
      const dataUrl = await generatePresignedUrl({
        files: [
          {
            fileName: safeData.data.image[0].name,
            fileType: safeData.data.image[0].type,
          },
        ],
      });
      console.log("dataUrl ->", dataUrl);
      const { urls } = dataUrl;

      if (!urls) {
        throw new Error("Erro ao obter URLs pré-assinadas");
      }

      const uploadPromises = urls.map((urlObj) =>
        axios
          .put(urlObj.presignedUrl, safeData.data.image, {
            headers: { "Content-Type": safeData.data.image[0].type },
          })
          .then(() => urlObj.key),
      );

      const uploadedKeys = await Promise.all(uploadPromises);

      return { ...safeData.data, image: uploadedKeys[0] };
    },
    onSuccess: (data) => {
      setStatusMessage("Salvando evento...");
      createGalleryMutation.mutate({ ...data, image: data.image });
    },
    onError: (error) => {
      console.error(error);
      setStatusMessage("Erro ao enviar imagens");
    },
  });

  const createGalleryMutation = useMutation({
    mutationFn: async (data: CreateGalleryProps) => {
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
    toast.promise(uploadImagesMutation.mutateAsync(data), {
      loading: "Enviando...",
      success: "Upload realizado com sucesso!",
      error: "Erro ao fazer upload.",
    });
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
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
      <input
        type="text"
        {...register("type")}
        placeholder="Tipo de festa"
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.type && (
        <p className="text-sm text-red-500">{errors.type.message}</p>
      )}
      <input
        type="text"
        {...register("location")}
        placeholder="Local da festa"
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.location && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}
      <input
        type="date"
        {...register("date")}
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.date && (
        <p className="text-sm text-red-500">{errors.date.message}</p>
      )}
      <input
        type="file"
        {...register("image")}
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.image?.message && (
        <p className="text-sm text-red-500">{`${errors.image.message}`}</p>
      )}
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
