"use client";
import LastEventItem from "./_components/last-event-item";
import { useGalleries } from "@/hooks/useGalleries";

const LastEvents = () => {
  const { data: events } = useGalleries();
  if (!events) return;
  return (
    <div className="flex flex-col gap-2">
      <h2 className="m-auto bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-5xl font-bold text-transparent">
        Últimos Eventos
      </h2>
      {events.map((event) => (
        <LastEventItem
          key={event.id}
          date={event.date}
          title={event.title}
          description={event.description}
          location={event.location}
          galeryId={event.id}
        />
      ))}
    </div>
  );
};

export default LastEvents;
