import { getGalleries } from "@/app/controllers/gallery";
import LastEventItem from "./_components/last-event-item";

const LastEvents = async () => {
  const events = await getGalleries({ search: "" });
  if (events.length === 0) return;
  return (
    <div className="flex flex-col gap-2">
      <h2 className="m-auto bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-5xl font-bold text-transparent">
        Últimos Eventos
      </h2>
      <LastEventItem
        date={events[0].date}
        title={events[0].title}
        description={events[0].description}
        location={events[0].location}
        galeryId={events[0].id}
      />
    </div>
  );
};

export default LastEvents;
