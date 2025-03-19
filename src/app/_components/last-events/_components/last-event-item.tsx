import { Dialog } from "../../dialog";
import { SeeGallery } from "../../see-gallery";

const LastEventItem = ({
  date,
  title,
  type,
  location,
}: {
  date: Date | null;
  title: string;
  type: string | null;
  location: string | null;
  galeryId: string;
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black px-8 py-2">
      <div className="flex items-center justify-start gap-1 text-start">
        <p className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
          {date?.toLocaleDateString("pt-BR", {
            day: "2-digit",
            timeZone: "UTC",
          })}
        </p>
        <span className="font-semibold">
          {date
            ?.toLocaleDateString("pt-BR", { month: "short", timeZone: "UTC" })
            .toLocaleUpperCase()
            .slice(0, -1)}
        </span>
      </div>
      <h4 className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
        {title}
      </h4>
      <p>
        <span className="font-bold">{type}</span> - {location}
      </p>
      <div className="rounded-md bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]">
        <div className="rounded-md bg-black px-2">
          <Dialog
            title="Difite o código do evento"
            buttonString="Ver evento"
            className="bg-transparent hover:bg-transparent"
          >
            <SeeGallery />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LastEventItem;
