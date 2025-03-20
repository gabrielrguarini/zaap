import { Dialog } from "@/app/_components/dialog";
import UploadForm from "@/app/_components/upload-form";

export const TableRow = ({
  id,
  name,
  location,
  date,
}: {
  id: string;
  name: string;
  location: string;
  date: string;
}) => {
  return (
    <tr>
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
        <Dialog buttonString="Adicionar Imagens" title="Adicionar Imagens">
          <UploadForm galleryId={id} />
        </Dialog>
      </td>
    </tr>
  );
};
