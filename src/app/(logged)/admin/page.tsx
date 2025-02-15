import { Dialog } from "@/app/_components/dialog";
import { GalleryForm } from "@/app/_components/gallery-form";
import UploadForm from "@/app/_components/upload-form";

export default async function AdminPage() {
  return (
    <div>
      <Dialog
        className="mx-4"
        title="Adiconar Evento"
        buttonString="Adicionar Evento"
      >
        <GalleryForm />
      </Dialog>
      <Dialog buttonString="Adicionar Imagens" title="Adicionar Imagens">
        <UploadForm />
      </Dialog>
    </div>
  );
}
