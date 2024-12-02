"use client";
import Image from "next/image";
interface GaleryListProps extends React.HTMLAttributes<HTMLDivElement> {
  selected: boolean;
  index: number;
  event: {
    src: string;
    title: string;
    type: string;
    locale: string;
    date: string;
  };
}

const GaleryListItem = ({
  selected = false,
  event,
  ...rest
}: GaleryListProps) => {
  return (
    <div
      className={`${
        selected
          ? "relative rounded-lg bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]"
          : "relative"
      }`}
      {...rest}
    >
      {" "}
      <div
        className={`${selected ? "m-[2px]" : ""} absolute inset-0 z-10 rounded-lg bg-gradient-to-r from-black via-black/80 to-black opacity-80`}
      ></div>
      <div className="relative h-[95px] w-[180px]">
        <Image
          className="rounded-lg"
          src={event.src}
          fill
          alt={"Galeria"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute left-[50%] top-4 z-20 translate-x-[-50%] whitespace-nowrap leading-3">
        <div className={selected ? "flex flex-col" : "hidden"}>
          <p className="whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-2xl font-bold text-transparent">
            {event.title}
          </p>
          <p className="font-bold">
            {event.type} <span className="font-light">- {event.locale}</span>
          </p>
          <span className="text-xs font-light">{event.date}</span>
        </div>
      </div>
    </div>
  );
};

export default GaleryListItem;
