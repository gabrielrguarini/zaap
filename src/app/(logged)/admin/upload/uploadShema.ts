import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export const fileUploadSchema = z
  .array(z.instanceof(File))
  .refine((list) => list.length > 0, "No files selected")
  .transform((list) => Array.from(list))
  .refine(
    (files) => {
      const allowedTypes: { [key: string]: boolean } = {
        "image/jpeg": true,
        "image/png": true,
        "image/jpg": true,
        "video/mp4": true,
        "video/wmv": true,
      };
      return files.every((file) => allowedTypes[file.type]);
    },
    { message: "Invalid file type. Allowed types: JPG, PNG, MP4, WMV" },
  )
  .refine(
    (files) => {
      return files.every((file) => file.size <= fileSizeLimit);
    },
    {
      message: "File size should not exceed 5MB",
    },
  );
export const uploadSchema = z.object({
  title: z.string(),
  files: fileUploadSchema,
});
