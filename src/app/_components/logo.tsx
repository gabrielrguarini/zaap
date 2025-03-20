import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";

const Logo: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      className={`${props.className} pointer-events-none h-[75px] w-[150px] select-none lg:h-[149px] lg:w-[300px]`}
    >
      <Image
        src={"/LogoHero.png"}
        alt="Um Z representando a zaap eventos"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Logo;
