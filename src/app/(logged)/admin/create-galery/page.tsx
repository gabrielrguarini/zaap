import { createGalery } from "@/app/controllers/galery";

export default function CreateGaleryPage() {
  return (
    <div className="p-4">
      <form action={createGalery} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Título da galeria"
          className="text-black"
        />
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </div>
  );
}
