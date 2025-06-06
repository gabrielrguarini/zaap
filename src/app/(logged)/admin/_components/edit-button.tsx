"use client";
import { Dialog } from "@/app/_components/dialog";
import { GalleryForm } from "@/app/_components/gallery-form";
import { Pen } from "lucide-react";

const EditButton = ({ id }: { id: string }) => {
  const testValues = {
    id,
    title: "",
    type: "",
    location: "",
    image: [],
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
