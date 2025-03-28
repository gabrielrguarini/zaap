"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
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
        {pathname === "/" && (
          <Link className="cursor-pointer hover:font-bold" href={"#galeria"}>
            GALERIA
          </Link>
        )}

        <Link
          href={
            "https://api.whatsapp.com/send/?phone=%2B553284238232&text&type=phone_number&app_absent=0"
          }
          className="cursor-pointer hover:font-bold"
          target="_blank"
        >
          CONTATO
        </Link>
      </div>
    </div>
  );
};
