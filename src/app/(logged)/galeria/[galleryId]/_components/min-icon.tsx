// import { useDeleteImage } from "@/hooks/useDeleteImage";
import { deleteImage } from "@/app/controllers/images";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

export const MinIcon = ({
  id,
  src,
  setImageSelected,
  index,
}: {
  src: string;
  id: string;
  setImageSelected: Dispatch<SetStateAction<number>>;
  index: number;
}) => {
  const queryCliente = useQueryClient();
  const { status } = useSession();
  return (
    <div className="relative">
      <Image
        src={src}
        alt={"Search"}
        width={160}
        height={120}
        className="cursor-pointer object-contain"
        onClick={() => setImageSelected(index)}
        quality={30}
      />
      {status === "authenticated" && (
        <TrashIcon
          className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/80 p-1 hover:bg-red-700/80"
          onClick={() => {
            toast.promise(
              async () => {
                await deleteImage(id);
                queryCliente.invalidateQueries({ queryKey: ["images"] });
              },
              {
                success: "Imagem deletada com sucesso!",
                error: "Erro ao deletar imagem.",
                loading: "Deletando imagem...",
              },
            );
          }}
        />
      )}
    </div>
  );
};
