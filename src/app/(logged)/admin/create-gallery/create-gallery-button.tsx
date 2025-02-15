"use client";

import { useRef } from "react";
import { GalleryForm } from "../../../_components/gallery-form";

const CreateGalleryButton = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };
  return (
    <>
      <button data-modal="create-gallery" onClick={openDialog}>
        Criar Galeria
      </button>
      <dialog
        onClick={(e) => e.currentTarget === e.target && closeDialog()}
        className="backdrop:bg-black/70"
        id="create-gallery"
        ref={dialogRef}
      >
        <div className="border-back bg-background bg-opacity-50 p-8 text-white">
          <h1 className="pb-2 text-3xl font-bold text-primary">Criar Evento</h1>
          <GalleryForm />
          <button
            className="text-bold rounded bg-foreground px-4 py-2"
            onClick={closeDialog}
          >
            Fechar
          </button>
        </div>
      </dialog>
    </>
  );
};

export default CreateGalleryButton;
