import Image from "next/image";
import { useState } from "react";

const GalerySearch = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="ml-auto w-full max-w-[50%] rounded-full bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px] sm:w-auto sm:min-w-72">
      <div className="relative h-8 w-full rounded-full bg-background">
        <input
          className="outline-non absolute inset-0 shrink-0 bg-transparent px-2"
          type="text"
          placeholder="Ex: Casamento João"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="pointer-events-none absolute right-0 top-1 flex items-center rounded-full bg-background pl-1 pr-4">
          <Image src={"/search.png"} width={20} height={20} alt={"Search"} />
          <p className="ml-2 mt-1 hidden text-xs font-semibold sm:block">
            Buscar
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalerySearch;
