import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between p-4 py-4">
      <Image
        src={"/ESCRITA.svg"}
        alt="Logo da Zaap Eventos"
        width={200}
        height={50}
      />
      <div className="flex gap-4 font-semibold">
        <Link href={""}>EVENTOS</Link>
        <Link href={""}>GALERIA</Link>
        <Link href={""} className="text-primary">
          CONTATO
        </Link>
      </div>
    </div>
  );
};
