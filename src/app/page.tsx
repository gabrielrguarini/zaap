import About from "./_components/about";
import EventsType from "./_components/events-type";
import FeatureBar from "./_components/feature-bar";
import HeroSlider from "./_components/hero-slider";
import { Navbar } from "./_components/navbar";
import VideoSlider from "./_components/video-slider";

export default function Home() {
  return (
    <div className="relative m-auto flex min-h-full w-full max-w-5xl flex-col gap-2 pt-12 md:gap-4">
      <Navbar />
      <HeroSlider />
      <FeatureBar />
      <div>
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
    </div>
  );
}
