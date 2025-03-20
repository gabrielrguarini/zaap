"use client";

import { useState } from "react";
import { getGalleryById } from "../controllers/gallery";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accessKeySchema, AccessKeySchema } from "@/schemas/accessKeySchema";

export const AccessKeyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccessKeySchema>({
    resolver: zodResolver(accessKeySchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: AccessKeySchema) => {
    setIsLoading(true);
    const galleryFromDb = await getGalleryById(data.gallery);
    if (!galleryFromDb) {
      toast.error("Galeria não encontrada");
      setIsLoading(false);
      return;
    }
    router.push(`/galeria/${galleryFromDb.id}`);
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="text"
          placeholder="Digite a chave de acesso"
          className="rounded bg-foreground p-2 text-white"
          maxLength={6}
          {...register("gallery")}
        />
        {errors.gallery && (
          <span className="pb-2 text-xs text-red-500">
            {errors.gallery.message}
          </span>
        )}

        <span className="my-4 max-w-80 text-xs text-zinc-400">
          {
            "FOTOS EXCLUSIVAS DO CONTRATANTE (ZAAPEVENTOS) PARA ACESSA-LAS SOLICITE A CHAVE DE ACESSO AOS DONOS DESSE EVENTO."
          }
        </span>

        <button
          type="submit"
          className={`text-bold mt-4 flex justify-center rounded px-4 py-2 ${isLoading ? "bg-gray-600" : "bg-primary hover:opacity-90"}`}
          disabled={isLoading}
        >
          {isLoading && <LoaderIcon className="mx-2 animate-spin" />} Ver
          galeria
        </button>
      </form>
    </div>
  );
};
