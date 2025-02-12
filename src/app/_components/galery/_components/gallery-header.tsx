import GallerySearch from "./gallery-search";
import { memo, useState } from "react";

interface GalleryHeaderProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const GalleryHeader = ({ search, setSearch }: GalleryHeaderProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="my-10 flex justify-between p-2 sm:m-0 sm:gap-4 md:gap-8 md:p-8">
      <h2
        className={`${isInputFocused && "hidden"} mr-2 whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-3xl font-semibold text-transparent sm:mr-0 sm:flex`}
      >
        Galeria de fotos
      </h2>
      <GallerySearch
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default memo(GalleryHeader);
