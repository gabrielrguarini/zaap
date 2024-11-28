import Image, { ImageProps } from "next/image";
import React from "react";

const Logo: React.FC<Partial<ImageProps>> = (props) => {
  return (
    <Image
      // src={"SIMBOLO.svg"}
      src={"/LogoHero.png"}
      alt="Um Z representando a zaap eventos"
      width={300}
      height={149}
      {...props}
    />
  );
};

export default Logo;
