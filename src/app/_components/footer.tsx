"use client";
import Link from "next/link";
import { Suspense } from "react";

const ThisYear = () => {
  const year = new Date().getFullYear();
  return <>© {year}</>;
};
const Footer = () => {
  return (
    <footer className="mt-8 bg-black p-4 text-center text-white">
      <p>
        Desenvolvido por{" "}
        <Link
          className="underline decoration-1 underline-offset-2 hover:font-bold"
          href={"https://gabrielguarini.vercel.app/"}
        >
          Gabriel Guarini
        </Link>{" "}
        <Suspense fallback="....">
          <ThisYear />
        </Suspense>
      </p>
    </footer>
  );
};

export default Footer;
