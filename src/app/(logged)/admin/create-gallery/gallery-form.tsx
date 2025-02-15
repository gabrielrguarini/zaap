"use client";
import { gallerySchema, GallerySchema } from "./gallerySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useUploadImages } from "@/hooks/useUploadImage";
import { useCreateGallery } from "@/hooks/useCreateGallery";

export const GalleryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GallerySchema>({
    resolver: zodResolver(gallerySchema),
  });
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadImages();
  const {
    mutateAsync: createGallery,
    isPending: isCreating,
    statusMessage: galleryMessage,
  } = useCreateGallery();
  const isPending = isUploading || isCreating;

  const onSubmit = async (data: GallerySchema) => {
    toast.promise(
      (async () => {
        const uploadedKeys = await uploadImages(data.image);
        await createGallery({ ...data, image: uploadedKeys[0] });
        reset();
      })(),
      {
        loading: "Enviando imagens...",
        success: "Evento criado com sucesso!",
        error: "Erro ao criar evento",
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Nome da festa"
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
      <input
        type="text"
        {...register("type")}
        placeholder="Tipo de festa"
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.type && (
        <p className="text-sm text-red-500">{errors.type.message}</p>
      )}
      <input
        type="text"
        {...register("location")}
        placeholder="Local da festa"
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.location && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}
      <input
        type="date"
        {...register("date")}
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.date && (
        <p className="text-sm text-red-500">{errors.date.message}</p>
      )}
      <input
        type="file"
        {...register("image")}
        className="rounded bg-foreground p-2 text-white"
      />
      {errors.image?.message && (
        <p className="text-sm text-red-500">{`${errors.image.message}`}</p>
      )}
      <button
        className="text-bold rounded bg-primary px-4 py-2"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </button>
      {galleryMessage && (
        <p className="text-sm text-green-500">{galleryMessage}</p>
      )}
    </form>
  );
};
