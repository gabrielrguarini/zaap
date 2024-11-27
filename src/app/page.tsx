import HeroSlider from "./_components/hero-slider";
import { Navbar } from "./_components/navbar";

export default function Home() {
  return (
    <div className="relative m-auto flex min-h-full w-full max-w-5xl flex-col py-12">
      <Navbar />
      <HeroSlider />
    </div>
  );
}
