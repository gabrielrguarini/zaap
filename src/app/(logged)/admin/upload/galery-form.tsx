"use client";
import { useState } from "react";
import axios from "axios";
import { setImagesToGalery } from "@/app/controllers/images";
import { UploadSchema, uploadSchema } from "./uploadShema";
import { generatePresignedUrl } from "./generate-presigned-url";
import { Galery } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const GaleryForm = ({ galleries }: { galleries: Galery[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const onSubmit = async (data: UploadSchema) => {
    console.log("Data: ", data);
    if (data.files.length === 0) {
      setUploadStatus("Por favor, selecione pelo menos um arquivo.");
      return;
    }

    const safeData = uploadSchema.safeParse(data);
    if (!safeData) {
      console.log("Deu erro");
      return;
    }
    const { files } = data;

    try {
      const data = await generatePresignedUrl({
        files: files.map((file: File) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      const { urls } = data;

      if (!urls) {
        setUploadStatus("Erro ao fazer upload dos arquivos.");
        return;
      }

      const uploadPromises = urls.map(
        (urlObj: { presignedUrl: string; key: string }, index: number) =>
          axios
            .put(urlObj.presignedUrl, files[index], {
              headers: {
                "Content-Type": files[index].type,
              },
            })
            .then(() => urlObj.key),
      );

      const uploadedKeys = await Promise.all(uploadPromises);

      setUploadedFiles(uploadedKeys);
      const resposta = await setImagesToGalery({
        galeryId: "cm6imlgiu0001vg3lu3q0ol5s",
        files: uploadedKeys,
      });
      setUploadStatus("Todos os arquivos foram enviados com sucesso!");
      console.log(resposta);
    } catch (error) {
      console.error(error);
      setUploadStatus("Erro ao fazer upload dos arquivos.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Título do arquivo"
        className="w-full bg-foreground p-1 px-2"
      />
      <span className="text-sm text-red-500">{errors.title?.message}</span>
      <select className="bg-foreground p-1 px-2">
        {galleries.map((galery) => (
          <option key={galery.id} value={galery.id}>
            {galery.title}
          </option>
        ))}
      </select>
      <input
        className="bg-foreground"
        type="file"
        {...register("files")}
        accept="image/* video/*"
        required
        multiple
      />{" "}
      {errors.files && (
        <span className="text-sm text-red-500">{`${errors.files?.message}`}</span>
      )}
      <input type="submit" value="Enviar" />
      {uploadStatus === "Enviando" ? <p>Enviando...</p> : <p>{uploadStatus}</p>}
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

export default GaleryForm;
