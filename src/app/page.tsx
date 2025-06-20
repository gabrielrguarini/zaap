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
import InstagramCarousel from "./_components/InstagramCarousel";

export default function Home() {
  return (
    <div className="relative m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 sm:pt-12 md:gap-4">
      <Navbar />
      <HeroSlider
        slides={[
          {
            src: "/slides/sonorizacao.png",
            alt: "Hero Slider",
          },
          {
            src: "/slides/iluminacao.png",
            alt: "Hero Slider",
          },
          {
            src: "/slides/estrutura.png",
            alt: "Hero Slider",
          },
        ]}
      />
      <FeatureBar />
      <div id="events">
        <EventsType
          imageString="/events-type/casamento.png"
          title="Casamento"
          subTitle="Perfeição até os mínimos detalhes"
          url="galeria/casamento"
        />
        <EventsType
          imageString="/events-type/debutante.png"
          title="Debutante"
          subTitle="Sua festa de 15 anos impecável"
          url="galeria/debutante"
        />

        <EventsType
          imageString="/events-type/formatura.png"
          title="Formatura"
          subTitle="Estrutura completa para a grande festa"
          url="galeria/formatura"
        />
        <EventsType
          imageString="/events-type/corporativo.png"
          title="Corporativo"
          subTitle="Competência e profissionalismo"
          url="galeria/corporativo"
        />
      </div>
      <VideoSlider />
      <About />
      <Structures />
      <WhatsappButton />
      {/* <Image
        className="m-auto my-8 sm:my-24"
        src={"/logo3.png"}
        width={180}
        height={213}
        alt="Logo da Zaap Eventos"
      /> */}
      <Suspense fallback={<GallerySkeleton text="Carregando galeria..." />}>
        <Gallery />
      </Suspense>
      <LastEvents />
      <InstagramCarousel />
    </div>
  );
}
