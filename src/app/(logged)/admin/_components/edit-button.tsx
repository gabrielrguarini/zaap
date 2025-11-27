"use client";
import { Dialog } from "@/app/_components/dialog";
import { GalleryForm } from "@/app/_components/gallery-form";
import { useGalleryById } from "@/hooks/useGalleryById";
import { Pen } from "lucide-react";

const EditButton = ({ id }: { id: string }) => {
  const { data: gallery, isLoading, isError } = useGalleryById(id);
  if (isLoading) return "Carregando...";
  if (isError) return "Erro..";
  if (!gallery) return "Galeria não existe";
  const testValues = {
    id,
    title: gallery.title,
    type: gallery.type,
    location: gallery.location,
    image: [],
    imageUrl: gallery.imageUrl ?? undefined,
  };
  return (
    <Dialog
      buttonString="Editar"
      title="Editar Galeria"
      buttonElement={
        <Pen
          size={40}
          className="cursor-pointer rounded-md bg-opacity-50 p-2"
        />
      }
    >
      <GalleryForm defaultValues={testValues} />
    </Dialog>
  );
};

export default EditButton;
