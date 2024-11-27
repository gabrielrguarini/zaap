import Image, { ImageProps } from "next/image";
import React from "react";

const Logo: React.FC<Partial<ImageProps>> = (props) => {
  return (
    <Image
      // src={"SIMBOLO.svg"}
      src={"/LogoHero.png"}
      alt="Um Z representando a zaap eventos"
      width={1200}
      height={1200}
      {...props}
    />
  );
};

export default Logo;
