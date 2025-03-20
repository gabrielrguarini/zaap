import { z } from "zod";

export const accessKeySchema = z.object({
  gallery: z
    .string()
    .max(6, "A chave de acesso deve ter no máximo 6 caracteres")
    .min(1, "A chave de acesso é obrigatória"),
});

export type AccessKeySchema = z.infer<typeof accessKeySchema>;
