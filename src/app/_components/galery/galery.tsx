import HeroSlider from "../hero-slider";
import GaleryHeader from "./_components/galery-header";

const Galery = () => {
  return (
    <div>
      <GaleryHeader />
      <HeroSlider src="/galery-picture.png" alt="Galeria de fotos" />
    </div>
  );
};

export default Galery;
