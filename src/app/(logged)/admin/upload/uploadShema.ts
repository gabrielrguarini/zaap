import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB
const allowedTypes: { [key: string]: boolean } = {
  "image/jpeg": true,
  "image/png": true,
};

export const fileUploadSchema = z.preprocess(
  (data) => {
    if (data instanceof FileList) {
      return Array.from(data);
    }
    if (data instanceof File) {
      return [data];
    }
    return data;
  },
  z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, {
      message: "Nenhum arquivo selecionado",
    })
    .refine((files) => files.length <= 5, {
      message: "Máximo de 5 arquivos permitidos",
    })
    .refine((files) => files.every((file) => allowedTypes[file.type]), {
      message: "Tipo de arquivo inválido. Tipos permitidos: JPG, PNG",
    })
    .refine((files) => files.every((file) => file.size <= fileSizeLimit), {
      message: "O tamanho do arquivo não deve exceder 5MB",
    }),
);

export const uploadSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  galeryId: z.string().min(1, "O ID da galeria é obrigatório."),
  files: fileUploadSchema,
});

export type UploadSchema = z.infer<typeof uploadSchema>;
