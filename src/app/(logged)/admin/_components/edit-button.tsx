import { Dialog } from "@/app/_components/dialog";
import { Pen } from "lucide-react";

const EditButton = ({ id }: { id: string }) => {
  return (
    <Dialog
      buttonString="Editar"
      title="Editar"
      buttonElement={
        <Pen
          size={40}
          className="cursor-pointer rounded-md bg-opacity-50 p-2"
        />
      }
    >
      <button className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {id}
      </button>
    </Dialog>
  );
};

export default EditButton;
