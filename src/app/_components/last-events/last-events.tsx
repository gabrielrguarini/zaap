import LastEventItem from "./_components/last-event-item";

const LastEvents = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="m-auto bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-5xl font-bold text-transparent">
        Últimos Eventos
      </h2>
      <LastEventItem />
      <LastEventItem />
      <LastEventItem />
      <LastEventItem />
    </div>
  );
};

export default LastEvents;
