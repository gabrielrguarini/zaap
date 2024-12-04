import Image from "next/image";
import Link from "next/link";

const WhatsappButton = () => {
  return (
    <Link className="m-auto my-8" href={"https://wa.me/+553284238232/"}>
      <div className="relative max-w-[330px] rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[3px]">
        <Image
          className="absolute left-[-10px] top-[-5px]"
          src={"/whatsapp.png"}
          width={80}
          height={80}
          alt={"Whatsapp"}
        />
        <div className="flex flex-col items-center whitespace-nowrap rounded-full bg-background">
          <div className="ml-16 p-2">
            <p className="leading-none">NÓS TE AJUDAMOS A</p>
            <p className="text-xl font-bold leading-none">
              MONTAR O EVENTO PERFEITO!
            </p>
            <p className="text-xss leading-none">
              CLIQUE AQUI E CONVERSE CONOSCO PELO WHATSAPP.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WhatsappButton;
