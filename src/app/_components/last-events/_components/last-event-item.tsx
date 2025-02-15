import Link from "next/link";

const LastEventItem = ({
  date,
  title,
  description,
  location,
  galeryId,
}: {
  date: Date | null;
  title: string;
  description: string | null;
  location: string | null;
  galeryId: string;
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black px-8 py-2">
      <div className="flex items-center justify-start gap-1 text-start">
        <p className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
          {date?.getDay()}
        </p>
        <span className="font-semibold">
          {date
            ?.toLocaleDateString("pt-BR", { month: "short" })
            .toLocaleUpperCase()
            .slice(0, -1)}
        </span>
      </div>
      <h4 className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
        {title}
      </h4>
      <p>
        {description} - {location}
      </p>
      <div className="rounded-md bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]">
        <button className="rounded-md bg-black px-2">
          <Link href={`/galeria/${galeryId}`}>Ver evento</Link>
        </button>
      </div>
    </div>
  );
};

export default LastEventItem;
