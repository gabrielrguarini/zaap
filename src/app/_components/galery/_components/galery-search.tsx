import Image from "next/image";

const GalerySearch = () => {
  return (
    <div className="min-w-72 rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]">
      <div className="relative h-full w-full rounded-full bg-background">
        <input
          className="h-full w-full bg-transparent px-2 outline-none"
          placeholder="Ex: Casamento João"
        ></input>
        <div className="absolute right-4 top-1 flex items-center">
          <Image src={"/search.png"} width={20} height={20} alt={"Search"} />
          <p className="ml-2 mt-1 text-xs font-semibold">Buscar</p>
        </div>
      </div>
    </div>
  );
};

export default GalerySearch;
