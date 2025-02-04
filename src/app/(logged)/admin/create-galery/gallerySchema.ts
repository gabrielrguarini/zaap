import { z } from "zod";
import { fileUploadSchema } from "../upload/uploadShema";

export const gallerySchema = z.object({
  title: z.string().min(3).max(255),
  type: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  date: z.date().optional(),
  image: fileUploadSchema,
});

export type GallerySchema = z.infer<typeof gallerySchema>;
