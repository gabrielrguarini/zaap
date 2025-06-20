"use client";
import LastEventItem from "./_components/last-event-item";
import { useGalleries } from "@/hooks/useGalleries";

const LastEvents = () => {
  const { data: events } = useGalleries("", false);
  if (!events) return;
  return (
    <div className="m-2 flex flex-col gap-2 md:mx-8 md:my-4">
      <h2 className="m-auto bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-5xl font-bold text-transparent">
        Últimos Eventos
      </h2>
      {events.slice(0, 5).map((event) => (
        <LastEventItem
          key={event.id}
          date={event.date}
          title={event.title}
          type={event.type}
          location={event.location}
          galleryId={event.id}
        />
      ))}
    </div>
  );
};

export default LastEvents;
