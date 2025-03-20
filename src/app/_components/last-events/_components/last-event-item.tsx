import { AccessKeyForm } from "../../access-key-form";
import { Dialog } from "../../dialog";

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
    <div className="flex items-center justify-between rounded-xl bg-black px-8 py-1">
      <div className="flex items-center justify-center gap-1 text-start">
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
      <h4 className="min-w-52 bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-start text-3xl font-bold text-transparent">
        {title}
      </h4>
      <p className="min-w-[250px]">
        <span className="font-bold">{type}</span> - {location}
      </p>
      <div className="rounded-md bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[1px]">
        <div className="rounded-md bg-black px-2">
          <Dialog
            title="Digite o código do evento"
            buttonString="Ver evento"
            className="bg-transparent py-1 hover:bg-transparent"
          >
            <AccessKeyForm />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LastEventItem;
