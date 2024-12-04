import GalerySearch from "./galery-search";

const GaleryHeader = () => {
  return (
    <div className="flex justify-between gap-4 p-2 md:gap-8 md:p-8">
      <h2 className="block whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-3xl font-semibold text-transparent">
        Galeria de fotos
      </h2>
      <GalerySearch />
    </div>
  );
};

export default GaleryHeader;
