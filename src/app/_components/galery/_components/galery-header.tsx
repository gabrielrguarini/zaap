import GalerySearch from "./galery-search";

const GaleryHeader = () => {
  return (
    <div className="my-10 flex justify-between p-2 sm:m-0 sm:gap-4 md:gap-8 md:p-8">
      <h2 className="block whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-3xl font-semibold text-transparent sm:mr-0">
        Galeria de fotos
      </h2>
      <GalerySearch />
    </div>
  );
};

export default GaleryHeader;
