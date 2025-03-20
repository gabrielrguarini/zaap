import Image from "next/image";
import Link from "next/link";

interface EventsTypeProps {
  title: string;
  subTitle: string;
  imageString: string;
}

const EventsType = ({ title, subTitle, imageString }: EventsTypeProps) => {
  return (
    <Link
      href={`https://wa.me/+553284238232/?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20uma%20festa%20de%20${title.toUpperCase()}`}
      rel="noopener noreferrer"
      target="_blank"
      className="col relative flex w-full cursor-pointer overflow-hidden p-2 md:px-8 md:py-4"
    >
      <div className="relative w-full">
        <Image src={imageString} width={960} height={226} alt={"44"} />
        <div className="absolute left-[50%] top-[50%] translate-y-[-50%] leading-none">
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
        className="absolute bottom-8 right-10 hidden items-center gap-1 sm:flex lg:bottom-12 lg:right-16"
      >
        <Image
          className=""
          src={"/events-type/pointer.png"}
          width={25}
          height={19}
          alt="Orçamento"
        />
        <div className="flex flex-col leading-none">
          <p className="text-xss">Faça um</p>
          <span className="text-xss font-semibold text-primary">Orçamento</span>
        </div>
      </div>
    </Link>
  );
};

export default EventsType;
