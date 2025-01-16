"use client";
import { useEffect, useState } from "react";
import GaleryHeader from "./_components/galery-header";
import GaleryList from "./_components/galery-list";
import GaleryHeroSlider from "./_components/galery-hero-slider";
import { useQuery } from "@tanstack/react-query";
import EventType from "./EventType";

const Galery = () => {
  const fetchEvents = async (): Promise<EventType[]> => {
    const response = await fetch("/data/events.json");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return response.json();
  };

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryFn: fetchEvents,
    queryKey: ["events"],
  });
  const [itemSelected, setItemSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(
    events || [],
  );

  useEffect(() => {
    if (!events) return;
    setItemSelected(0);
    setFilteredEvents(
      events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, events]);
  useEffect(() => {
    const interval = setInterval(() => {
      setItemSelected((prev) =>
        prev >= filteredEvents.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredEvents, setItemSelected]);
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os eventos.</div>;
  }

  return (
    <div id="galery">
      <GaleryHeader search={search} setSearch={setSearch} />
      <GaleryHeroSlider event={filteredEvents[itemSelected]} />
      <GaleryList
        events={filteredEvents}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
    </div>
  );
};

export default Galery;
