"use client";
import { useState } from "react";
import axios from "axios";
import { setImagesToGalery } from "@/app/controllers/images";
import { UploadSchema, uploadSchema } from "./uploadShema";
import { generatePresignedUrl } from "./generate-presigned-url";
import { Galery } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const UploadForm = ({ galleries }: { galleries: Galery[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (data: UploadSchema) => {
      if (data.files.length === 0) {
        throw new Error("Por favor, selecione pelo menos um arquivo.");
      }

      const presignedResponse = await generatePresignedUrl({
        files: data.files.map((file: File) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      const { urls } = presignedResponse;
      if (!urls) {
        throw new Error("Erro ao obter URLs pré-assinadas.");
      }

      const uploadPromises = urls.map(
        (urlObj: { presignedUrl: string; key: string }, index: number) =>
          axios
            .put(urlObj.presignedUrl, data.files[index], {
              headers: {
                "Content-Type": data.files[index].type,
              },
            })
            .then(() => urlObj.key),
      );
      const uploadedKeys = await Promise.all(uploadPromises);

      await setImagesToGalery({
        galeryId: data.galeryId,
        files: uploadedKeys,
      });

      return uploadedKeys;
    },
    onSuccess: (uploadedKeys) => {
      setUploadedFiles(uploadedKeys);
    },
  });

  const onSubmit = (data: UploadSchema) => {
    uploadMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Título do arquivo"
        className="w-full bg-foreground p-1 px-2"
      />
      {errors.title && (
        <span className="text-sm text-red-500">{errors.title.message}</span>
      )}

      <select {...register("galeryId")} className="bg-foreground p-1 px-2">
        {galleries.map((galery) => (
          <option key={galery.id} value={galery.id}>
            {galery.title}
          </option>
        ))}
      </select>

      <input
        type="file"
        {...register("files")}
        accept="image/* video/*"
        multiple
        className="bg-foreground"
      />
      {errors.files && (
        <span className="text-sm text-red-500">
          {errors.files?.message as string}
        </span>
      )}

      <button
        type="submit"
        className="bg-primary px-4 py-2"
        disabled={uploadMutation.isPending}
      >
        {uploadMutation.isPending ? "Enviando..." : "Enviar"}
      </button>

      {uploadMutation.isError && (
        <p className="text-red-500">Erro ao fazer upload dos arquivos.</p>
      )}
      {uploadMutation.isSuccess && (
        <p className="text-green-500">
          Todos os arquivos foram enviados com sucesso!
        </p>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h2>Arquivos enviados:</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
