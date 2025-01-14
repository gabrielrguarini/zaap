import GalerySearch from "./galery-search";
import { useState } from "react";

const GaleryHeader = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="my-10 flex justify-between p-2 sm:m-0 sm:gap-4 md:gap-8 md:p-8">
      <h2
        className={`${isInputFocused && "hidden"} mr-2 whitespace-nowrap bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-3xl font-semibold text-transparent sm:mr-0 sm:flex`}
      >
        Galeria de fotos
      </h2>
      <GalerySearch
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
      />
    </div>
  );
};

export default GaleryHeader;
