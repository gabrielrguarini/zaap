import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4">
      <Image
        src={"/ESCRITA.svg"}
        alt="Logo da Zaap Eventos"
        width={200}
        height={50}
        className="cursor-pointer"
      />
      <div className="flex gap-4 font-semibold">
        <Link className="cursor-pointer" href={""}>
          EVENTOS
        </Link>
        <Link className="cursor-pointer" href={""}>
          GALERIA
        </Link>
        <Link href={""} className="cursor-pointer text-primary">
          CONTATO
        </Link>
      </div>
    </div>
  );
};
