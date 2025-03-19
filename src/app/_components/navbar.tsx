import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-center px-8 py-4 sm:justify-between">
      <Image
        src={"/ESCRITA.svg"}
        alt="Logo da Zaap Eventos"
        width={200}
        height={50}
        className="transform cursor-pointer transition-transform hover:scale-105"
      />
      <div className="hidden gap-4 font-semibold sm:flex">
        <Link className="cursor-pointer hover:font-bold" href={"#events"}>
          EVENTOS
        </Link>
        <Link className="cursor-pointer hover:font-bold" href={"#galeria"}>
          GALERIA
        </Link>
        <Link href={"#contato"} className="cursor-pointer hover:font-bold">
          CONTATO
        </Link>
      </div>
    </div>
  );
};
