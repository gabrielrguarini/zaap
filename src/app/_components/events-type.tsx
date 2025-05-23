import Image from "next/image";
import Link from "next/link";

interface EventsTypeProps {
  title: string;
  subTitle: string;
  imageString: string;
  url: string;
}

const EventsType = ({ title, subTitle, imageString, url }: EventsTypeProps) => {
  return (
    <div className="m-2 overflow-hidden md:mx-8 md:my-4">
      <Link
        href={url}
        rel="noopener noreferrer"
        className="col relative flex w-full cursor-pointer"
      >
        <div className="relative w-full">
          <Image src={imageString} width={960} height={226} alt={"44"} />
          <div className="absolute left-[50%] top-[50%] translate-y-[-70%] leading-none lg:translate-y-[-50%]">
            <h3
              data-aos="fade-left"
              className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-3xl font-semibold text-transparent xss:text-4xl md:text-7xl lg:text-[5.5rem]"
            >
              {title}
            </h3>
            <p
              data-aos="fade-left"
              className="-mt-2 ml-2 text-xss leading-3 xss:text-xs md:text-sm lg:text-base"
            >
              {subTitle}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-right"
          className="absolute bottom-2 right-4 flex items-center gap-1 lg:bottom-6 lg:right-8"
        >
          <Image
            className="h-4 w-4 lg:h-6 lg:w-6"
            src={"/events-type/pointer.png"}
            width={25}
            height={19}
            alt="Orçamento"
          />
          <div className="flex flex-col leading-none">
            <p className="text-xss">Clique aqui e</p>
            <span className="text-xss font-semibold text-primary">
              Veja mais
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventsType;
