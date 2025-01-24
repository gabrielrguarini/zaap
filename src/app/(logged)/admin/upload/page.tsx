"use client";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const files = Array.from(form.file.files) as File[];

    if (!files.length) {
      setUploadStatus("Por favor, selecione pelo menos um arquivo.");
      return;
    }

    try {
      const { data } = await axios.post("/api/generate-presigned-url", {
        files: files.map((file) => ({
          fileName: file.name,
          fileType: file.type,
        })),
      });

      const { urls } = data;

      // Faz o upload de cada arquivo usando a URL correspondente
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

      setUploadStatus("Todos os arquivos foram enviados com sucesso!");
      setUploadedFiles(uploadedKeys);
    } catch (error) {
      console.error(error);
      setUploadStatus("Erro ao fazer upload dos arquivos.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Título do arquivo" />
        <input type="file" name="file" multiple />{" "}
        <input type="submit" value="Enviar" />
      </form>
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
    </div>
  );
}
