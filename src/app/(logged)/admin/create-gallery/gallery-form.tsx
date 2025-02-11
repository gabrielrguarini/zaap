"use client";
import { createGallery } from "@/app/controllers/gallery";
import { gallerySchema, GallerySchema } from "./gallerySchema";
import { useForm } from "react-hook-form";
import { generatePresignedUrl } from "../upload/generate-presigned-url";
import axios from "axios";
import { useState } from "react";

export const GalleryForm = () => {
  const { register, handleSubmit } = useForm<GallerySchema>();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const onSubmit = async (data: GallerySchema) => {
    console.log(data);
    const safeData = gallerySchema.safeParse({
      ...data,
      date: data.date && new Date(data.date),
    });
    console.log(safeData);
    if (!safeData.data) {
      return;
    }

    const dataUrl = await generatePresignedUrl({
      files: safeData.data.image.map((file: File) => ({
        fileName: file.name,
        fileType: file.type,
      })),
    });

    const { urls } = dataUrl;

    if (!urls) {
      return "Erro ao fazer upload";
    }

    const uploadPromises = urls.map(
      (urlObj: { presignedUrl: string; key: string }, index: number) =>
        axios
          .put(urlObj.presignedUrl, safeData.data.image[index], {
            headers: {
              "Content-Type": safeData.data.image[index].type,
            },
          })
          .then(() => urlObj.key),
    );

    const uploadedKeys = await Promise.all(uploadPromises);
    setUploadedFiles(uploadedKeys);

    await createGallery({ ...safeData.data, image: uploadedKeys[0] });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Nome da festa"
        className="bg-foreground"
      />
      <input
        type="text"
        {...register("type")}
        placeholder="Tipo de festa"
        className="bg-foreground"
      />
      <input
        type="text"
        {...register("location")}
        placeholder="Descrição da festa"
        className="bg-foreground"
      />
      <input type="date" {...register("date")} className="bg-foreground" />
      <input type="file" {...register("image")} className="bg-foreground" />
      <button type="submit">Enviar</button>
      {uploadedFiles}
    </form>
  );
};
