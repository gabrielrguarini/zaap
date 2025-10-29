"use client";
import { gallerySchema, GallerySchema } from "../../schemas/gallerySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useUploadImages } from "@/hooks/useUploadImage";
import { useCreateGallery } from "@/hooks/useCreateGallery";
import { useGalleries } from "@/hooks/useGalleries";
import { getGalleriesIds } from "../controllers/gallery";
import { generateRandomId } from "@/utils/generate-random-id";
import { fileUploadSchema } from "@/schemas/uploadShema";

type GalleryFormProps = {
  defaultValues?: GallerySchema & { id: string };
};
const editGallerySchema = gallerySchema.extend({
  image: fileUploadSchema.optional(),
});
export const GalleryForm = ({ defaultValues }: GalleryFormProps) => {
  const buttonText = defaultValues ? "Editar" : "Criar";
  const isEdit = Boolean(defaultValues?.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GallerySchema>({
    resolver: zodResolver(isEdit ? editGallerySchema : gallerySchema),
  });
  const { mutateAsync: uploadImages, isPending: isUploading } =
    useUploadImages();
  const {
    mutateAsync: createGallery,
    isPending: isCreating,
    statusMessage: galleryMessage,
  } = useCreateGallery();

  const { refetch } = useGalleries("", undefined);
  const isPending = isUploading || isCreating;

  const onSubmit = async (data: GallerySchema) => {
    if (!isEdit) {
      toast.promise(
        (async () => {
          const galleriesId = await getGalleriesIds();
          const galleryId = generateRandomId(galleriesId);
          const uploadedKeys = await uploadImages({
            galleryId,
            files: data.image,
          });
          await createGallery({
            ...data,
            image: uploadedKeys[0],
            id: galleryId,
          });
          reset();
          refetch();
        })(),
        {
          loading: "Enviando imagens...",
          success: "Evento criado com sucesso!",
          error: "Erro ao criar evento",
        },
      );
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        {...register("title")}
        placeholder="Nome da festa"
        className="rounded bg-foreground p-2 text-white"
        defaultValue={defaultValues?.title || ""}
      />
      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}
      <input
        type="text"
        {...register("type")}
        placeholder="Tipo de festa"
        className="rounded bg-foreground p-2 text-white"
        defaultValue={defaultValues?.type || ""}
      />
      {errors.type && (
        <p className="text-sm text-red-500">{errors.type.message}</p>
      )}
      <input
        type="text"
        {...register("location")}
        placeholder="Local da festa"
        className="rounded bg-foreground p-2 text-white"
        defaultValue={defaultValues?.location || ""}
      />
      {errors.location && (
        <p className="text-sm text-red-500">{errors.location.message}</p>
      )}
      <input
        type="date"
        {...register("date")}
        className="rounded bg-foreground p-2 text-white"
        defaultValue={
          defaultValues?.date?.toLocaleDateString("us-EN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }) || ""
        }
      />
      {errors.date && (
        <p className="text-sm text-red-500">{errors.date.message}</p>
      )}
      <input
        type="file"
        {...register("image")}
        className="rounded bg-foreground p-2 text-white"
        disabled={defaultValues?.id ? true : false}
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
          buttonText
        )}
      </button>
      {galleryMessage && (
        <p className="text-sm text-green-500">{galleryMessage}</p>
      )}
    </form>
  );
};
