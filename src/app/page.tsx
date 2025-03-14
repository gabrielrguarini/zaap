import Image from "next/image";
import About from "./_components/about";
import EventsType from "./_components/events-type";
import FeatureBar from "./_components/feature-bar";
import HeroSlider from "./_components/hero-slider/hero-slider";
import { Navbar } from "./_components/navbar";
import Structures from "./_components/structures";
import VideoSlider from "./_components/video-slider";
import WhatsappButton from "./_components/whatsapp";
import LastEvents from "./_components/last-events/last-events";
import Gallery from "./_components/galery/gallery";
import { Suspense } from "react";
import GallerySkeleton from "./_components/galery/_components/skeleton";

export default function Home() {
  return (
    <div className="relative m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 sm:pt-12 md:gap-4">
      <Navbar />
      <HeroSlider
        slides={[
          {
            src: "/slides/2.png",
            alt: "Hero Slider",
          },
          {
            src: "/slides/21.png",
            alt: "Hero Slider",
          },
          {
            src: "/slides/30.png",
            alt: "Hero Slider",
          },
        ]}
      />
      <FeatureBar />
      <div id="events">
        <EventsType
          imageString="/events-type/44.png"
          title="Debutante"
          subTitle="Sua festa de 15 anos impecável"
        />
        <EventsType
          imageString="/events-type/50.png"
          title="Casamento"
          subTitle="Perfeição até os mínimos detalhes"
        />
        <EventsType
          imageString="/events-type/54.png"
          title="Formatura"
          subTitle="Estrutura completa para a grande festa"
        />
        <EventsType
          imageString="/events-type/59.png"
          title="Corporativo"
          subTitle="Competência e profissionalismo"
        />
      </div>
      <VideoSlider />
      <About />
      <Structures />
      <WhatsappButton />
      <Image
        className="m-auto my-8 sm:my-24"
        src={"/logo3.png"}
        width={180}
        height={213}
        alt="Logo da Zaap Eventos"
      />
      <Suspense fallback={<GallerySkeleton text="Carregando galeria..." />}>
        <Gallery />
      </Suspense>
      <LastEvents />
    </div>
  );
}
