"use server";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { SingOutButton } from "../_components/sing-out-button";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <header className="mx-auto mt-4 flex min-h-full w-full max-w-5xl justify-between gap-2 p-2 md:gap-4">
        <Link href="/">
          <Image
            src={"/ESCRITA.svg"}
            alt="Logo da Zaap Eventos"
            width={200}
            height={50}
            className="cursor-pointer"
          />
        </Link>
        <nav className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <Link href="/admin">Admin</Link>
            </li>
            <li>
              <Link href="/galeria">Galeria</Link>
            </li>
          </ul>
          {/* <SignOutButton> */}
          {session ? (
            <div
              className={`h-full rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]`}
            >
              <SingOutButton />
            </div>
          ) : (
            <div
              className={`h-full rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]`}
            >
              <Link href="/sign-in">Entrar</Link>
            </div>
          )}
        </nav>
      </header>
      {children}
    </>
  );
}
