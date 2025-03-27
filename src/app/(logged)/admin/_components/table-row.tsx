"use client";
import { Dialog, useModal } from "@/app/_components/dialog";
import UploadForm from "@/app/_components/upload-form";
import { useDeleteGallery } from "@/hooks/useDeleteGallery";

export const TableRow = ({
  id,
  name,
  location,
  date,
  isPublic,
}: {
  id: string;
  name: string;
  location: string;
  date: string;
  isPublic?: boolean;
}) => {
  const { mutate, isPending, isError } = useDeleteGallery({ galleryId: id });
  const handleDelete = () => {
    mutate();
  };
  const ConfirmDelete = () => {
    const { closeDialog } = useModal();
    return (
      <div>
        <p>Tem certeza que deseja excluir?</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={closeDialog}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              handleDelete();
              closeDialog();
            }}
            className="rounded bg-red-500 px-4 py-2 text-white"
            disabled={isPending}
          >
            {isPending ? "Excluindo..." : "Confirmar"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <tr className={isPublic ? `bg-stone-900` : ``}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
        {id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {location}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {date}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        <Dialog
          className="hover:bg-zinc-700"
          buttonString="Adicionar Imagens"
          title="Adicionar Imagens"
        >
          <UploadForm galleryId={id} />
        </Dialog>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        <Dialog
          title="Excluir"
          buttonString="Excluir"
          buttonElement={
            <button
              disabled={isPending}
              className="rounded bg-red-500 p-2 text-white disabled:bg-gray-400"
            >
              {isPending ? "Excluindo..." : "Excluir"}
            </button>
          }
        >
          <ConfirmDelete />
        </Dialog>
        {isError && <p className="text-sm text-red-500">Erro ao excluir!</p>}
      </td>
    </tr>
  );
};
