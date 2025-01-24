"use client";

import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  console.log("doidera", pathName);

  return (
    <>
      <header className="m-auto mt-4 flex min-h-full w-full max-w-5xl justify-between gap-2 p-2 md:gap-4">
        <h1 className="text-3xl">Galeria</h1>
        <nav className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <a
                href="/admin"
                className={`${pathName === "/admin" ? "font-bold text-[#ffb400]" : ""}`}
              >
                Admin
              </a>
            </li>
            <li>
              <a
                href="/galeria"
                className={`${pathName === "/galeria" ? "font-bold text-[#ffb400]" : ""}`}
              >
                Galeria
              </a>
            </li>
          </ul>
          <SignOutButton>
            <div
              className={`h-full rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]`}
            >
              <button className="w-ful h-full rounded-full bg-background px-8">
                Sair
              </button>
            </div>
          </SignOutButton>
        </nav>
      </header>
      {children}
    </>
  );
}
