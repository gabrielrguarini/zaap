import Image from "next/image";

interface GalerySearchProps {
  isInputFocused: boolean;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const GalerySearch = ({
  isInputFocused,
  setIsInputFocused,
  search,
  setSearch,
}: GalerySearchProps) => {
  return (
    <div
      className={`ml-auto w-72 rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px] transition-all duration-300 ${isInputFocused && "w-screen sm:w-72"} `}
    >
      <div className="relative h-8 rounded-full bg-background">
        <input
          className="absolute inset-0 shrink-0 bg-transparent px-2 outline-none"
          type="text"
          placeholder="Ex: Casamento João"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <div className="pointer-events-none absolute right-0 top-1 flex items-center rounded-full bg-background pl-1 pr-4">
          <Image src={"/search.png"} width={20} height={20} alt={"Search"} />
          <p className="ml-2 mt-1 text-xs font-semibold">Buscar</p>
        </div>
      </div>
    </div>
  );
};

export default GalerySearch;
