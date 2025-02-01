"use client";
import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export const fileUploadSchema = z
  .unknown()
  .refine((list) => list instanceof FileList, "Arquivo inválido")
  .refine((list) => list.length > 0, "Nenhum arquivo selecionado")
  .transform((list) => Array.from(list))
  .refine(
    (files) => {
      const allowedTypes: { [key: string]: boolean } = {
        "image/jpeg": true,
        "image/png": true,
        "image/jpg": true,
        "video/mp4": true,
        "video/wmv": true,
        "video/webm": true,
      };
      return files.every((file) => allowedTypes[file.type]);
    },
    {
      message: "Tipo de arquivo inválido. Tipos permitidos: JPG, PNG, MP4, WMV",
    },
  )
  .refine(
    (files) => {
      return files.every((file) => file.size <= fileSizeLimit);
    },
    {
      message: "Arquivos não podem exceder 5MB",
    },
  );
export const uploadSchema = z.object({
  title: z.string().min(3, "Título muito curto").max(100, "Título muito longo"),
  files: fileUploadSchema,
});

export type UploadSchema = z.infer<typeof uploadSchema>;
