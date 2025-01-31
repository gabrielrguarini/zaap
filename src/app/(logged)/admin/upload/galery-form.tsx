"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { setImagesToGalery } from "@/app/controllers/images";
import { uploadSchema } from "./uploadShema";
import { generatePresignedUrl } from "./generate-presigned-url";
import { Galery } from "@prisma/client";

const GaleryForm = ({ galleries }: { galleries: Galery[] }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const filesForm = formData.getAll("files") as File[];
    const titleForm = formData.get("title");
    const safeData = uploadSchema.safeParse({
      title: titleForm,
      files: filesForm,
    });

    if (!safeData.success) {
      setUploadStatus("Por favor, selecione pelo menos um arquivo.");
      return;
    }

    const { files } = safeData.data;
    if (!files.length) {
      setUploadStatus("Por favor, selecione pelo menos um arquivo.");
      return;
    }

    try {
      const data = await generatePresignedUrl(
        JSON.parse(
          JSON.stringify({
            files: files.map((file) => ({
              fileName: file.name,
              fileType: file.type,
            })),
          }),
        ),
      );

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        placeholder="Título do arquivo"
        className="text-black"
      />
      <select className="text-black">
        {galleries.map((galery) => (
          <option key={galery.id} value={galery.id}>
            {galery.title}
          </option>
        ))}
      </select>
      <input type="file" name="files" accept="image/* video/*" multiple />{" "}
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
