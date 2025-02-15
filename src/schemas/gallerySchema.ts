import { z } from "zod";
import { fileUploadSchema } from "./uploadShema";

export const gallerySchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(255, "O título deve ter no máximo 255 caracteres."),
  type: z
    .string()
    .min(3, "O tipo deve ter no mínimo 3 caracteres.")
    .max(255, "O tipo deve ter no máximo 255 caracteres."),
  location: z
    .string()
    .min(3, "A localização deve ter no mínimo 3 caracteres.")
    .max(30, "A localização deve ter no máximo 30 caracteres."),
  date: z.preprocess((arg) => {
    if (typeof arg === "string" && arg.trim() === "") return undefined;
    return arg;
  }, z.coerce.date().optional()),
  image: fileUploadSchema,
});

export type GallerySchema = z.infer<typeof gallerySchema>;
