import { getGallery } from "@/app/controllers/gallery";
import UploadForm from "./upload-form";

export default async function UploadPage() {
  const galleries = await getGallery({ authorId: 1 });

  if (!galleries) {
    return <div>Erro ao buscar galerias.</div>;
  }

  return (
    <div className="p-4">
      <UploadForm galleries={galleries} />
    </div>
  );
}
