import { getGalery } from "@/app/controllers/galery";
import GaleryForm from "./galery-form";

export default async function UploadPage() {
  const galleries = await getGalery({ authorId: "1" });

  if (!galleries) {
    return <div>Erro ao buscar galerias.</div>;
  }

  return (
    <div className="p-4">
      <GaleryForm galleries={galleries} />
    </div>
  );
}
