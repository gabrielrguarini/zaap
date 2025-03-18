import { Dialog } from "@/app/_components/dialog";
import { GalleryForm } from "@/app/_components/gallery-form";
import UploadForm from "@/app/_components/upload-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const sessao = await auth();
  if (!sessao) {
    redirect("/sign-in");
  }
  return (
    <div>
      <Dialog
        className="mx-4"
        title="Adicionar Evento"
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
