import { getGallery } from "@/app/controllers/gallery";
import UploadForm from "../../../_components/upload-form";
import { Dialog } from "@/app/_components/dialog";

export default async function UploadPage() {
  const galleries = await getGallery({ authorId: 1 });

  if (!galleries) {
    return <div>Erro ao buscar galerias.</div>;
  }

  return (
    <div className="p-4">
      <Dialog buttonString="Enviar imagens" title="Enviar imagens">
        <UploadForm />
      </Dialog>
    </div>
  );
}
