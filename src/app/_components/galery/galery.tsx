"use client";
import { useEffect, useState } from "react";
import GaleryHeader from "./_components/galery-header";
import GaleryList from "./_components/galery-list";
import GaleryHeroSlider from "./_components/galery-hero-slider";

const events = [
  {
    src: "/galery-list/45.png",
    title: "Maria Xavier",
    type: "15 Anos",
    locale: "Espera Feliz",
    date: "22 de Outubro 2024",
    position: "center 30%",
  },
  {
    src: "/galery-list/0.webp",
    title: "Fulano 1",
    type: "Casamento",
    locale: "Carangola",
    date: "20 de Novembro 2023",
  },
  {
    src: "/galery-list/0.jpg",
    title: "Maria Xavier 2",
    type: "15 Anos",
    locale: "Espera Feliz",
    date: "22 de Outubro 2024",
  },
  {
    src: "/galery-list/0.jpg",
    title: "Fulano 3",
    type: "Casamento",
    locale: "Carangola",
    date: "20 de Novembro 2023",
  },
  {
    src: "/galery-list/0.jpg",
    title: "Maria Xavier 4",
    type: "15 Anos",
    locale: "Espera Feliz",
    date: "22 de Outubro 2024",
  },
];

const Galery = () => {
  const [itemSelected, setItemSelected] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setItemSelected((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [itemSelected, setItemSelected]);

  return (
    <div>
      <GaleryHeader />
      <GaleryHeroSlider event={events[itemSelected]} />
      <GaleryList
        events={events}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
    </div>
  );
};

export default Galery;
