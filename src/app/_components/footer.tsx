import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
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
        © {year}
      </p>
    </footer>
  );
};

export default Footer;
