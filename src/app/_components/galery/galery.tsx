"use client";
import { useEffect, useState } from "react";
import GaleryHeader from "./_components/galery-header";
import GaleryList from "./_components/galery-list";
import GaleryHeroSlider from "./_components/galery-hero-slider";
import { useQuery } from "@tanstack/react-query";
// import EventType from "./EventType";
import Logo from "../logo";
import GalerySkeleton from "./_components/skeleton";
import { getGalleries } from "@/app/controllers/galery";
import { Galery as GaleryType } from "@prisma/client";
import { useQueryState } from "nuqs";

const Galery = () => {
  const [itemSelected, setItemSelected] = useState(0);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getGalleries({ search }),
    queryKey: ["events"],
  });
  const [filteredEvents, setFilteredEvents] = useState<GaleryType[]>(
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
    return <GalerySkeleton text="Carregando eventos..." />;
  }

  if (isError) {
    return <GalerySkeleton text="Erro ao carregar os eventos." />;
  }

  if (filteredEvents.length <= 0) {
    return (
      <div className="">
        <GaleryHeader search={search} setSearch={setSearch} />
        <div className="relative flex h-[212px] w-full items-center justify-center rounded-3xl bg-black/20 lg:h-[424px]">
          <Logo className="absolute left-[50%] top-[-20%] z-10 translate-x-[-50%]" />
          <h1 className="text-center text-3xl font-bold text-white">
            Nenhum evento encontrado.
          </h1>
        </div>
      </div>
    );
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
