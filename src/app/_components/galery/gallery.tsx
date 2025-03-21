"use client";
import { useEffect, useState } from "react";
import GalleryHeader from "./_components/gallery-header";
import GalleryList from "./_components/gallery-list";
import GalleryHeroSlider from "./_components/gallery-hero-slider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Logo from "../logo";
import GallerySkeleton from "./_components/skeleton";
import { getGalleries } from "@/app/controllers/gallery";
import { useQueryState } from "nuqs";
import { Dialog } from "../dialog";
import { AccessKeyForm } from "../access-key-form";

const Gallery = () => {
  const [itemSelected, setItemSelected] = useState(0);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getGalleries({ search }),
    queryKey: ["events", search],
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!events) return;
    setItemSelected(0);
    const interval = setInterval(() => {
      setItemSelected((prev) => (prev >= events.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [events]);

  if (isLoading) {
    return (
      <>
        <GalleryHeader search={search} setSearch={setSearch} />
        <GallerySkeleton text="Carregando eventos..." />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <GalleryHeader search={search} setSearch={setSearch} />
        <GallerySkeleton text="Erro ao carregar os eventos." />
      </>
    );
  }
  if (!events) {
    return (
      <>
        <GalleryHeader search={search} setSearch={setSearch} />

        <GallerySkeleton text="Eventos indefinidos..." />
      </>
    );
  }

  if (events.length <= 0) {
    return (
      <div className="">
        <GalleryHeader search={search} setSearch={setSearch} />
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
    <div id="galeria">
      <GalleryHeader search={search} setSearch={setSearch} />
      <Dialog
        className="cursor-pointer"
        buttonString="Ver evento"
        title="Digite o código do evento"
        buttonElement={<GalleryHeroSlider event={events[itemSelected]} />}
      >
        <AccessKeyForm />
      </Dialog>
      <GalleryList
        events={events}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
    </div>
  );
};

export default Gallery;
