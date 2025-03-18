"use client";
import { setImagesToGalery } from "@/app/controllers/images";
import { UploadSchema, uploadSchema } from "../../schemas/uploadShema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useUploadImages } from "@/hooks/useUploadImage";
import { useGalleries } from "@/hooks/useGalleries";

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const {
    mutateAsync: uploadImages,
    isPending,
    isError,
    isSuccess,
  } = useUploadImages();

  const { data: galleries } = useGalleries();

  const onSubmit = (data: UploadSchema) => {
    toast.promise(
      async () => {
        const uploadedKeys = await uploadImages(data.files);
        await setImagesToGalery({
          galleryId: data.galeryId,
          files: uploadedKeys,
        });
      },
      {
        loading: "Enviando...",
        success: "Upload realizado com sucesso!",
        error: "Erro ao fazer upload.",
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <select {...register("galeryId")} className="bg-foreground p-1 px-2">
        {galleries?.map((gallery) => (
          <option key={gallery.id} value={gallery.id}>
            {gallery.title}
          </option>
        ))}
      </select>

      <span className="-mt-3 text-sm text-red-500">
        {errors.galeryId?.message}
      </span>
      <input
        type="file"
        {...register("files")}
        accept="image/* video/*"
        multiple
        className="bg-foreground"
      />
      {errors.files && (
        <span className="-mt-3 text-sm text-red-500">
          {errors.files?.message as string}
        </span>
      )}

      <button
        type="submit"
        className={`px-4 py-2 ${isPending ? "cursor-not-allowed bg-foreground" : "bg-primary"}`}
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar"}
      </button>

      {isError && (
        <p className="text-red-500">Erro ao fazer upload dos arquivos.</p>
      )}
      {isSuccess && (
        <p className="text-green-500">
          Todos os arquivos foram enviados com sucesso!
        </p>
      )}
    </form>
  );
};

export default UploadForm;
