import StructureItem from "./structure-item";

const Structures = () => {
  const items = [
    { src: "/structures/69.png", title: "ILUMINAÇÃO CÊNICA" },
    { src: "/structures/70.png", title: "TÚNEL DE LED" },
    { src: "/structures/71.png", title: "CADEIRAS E MESAS" },
    { src: "/structures/72.png", title: "BOATE NEON" },
    { src: "/structures/73.png", title: "PAINEL DE LED" },
    { src: "/structures/74.png", title: "PISTA PARIS" },
    { src: "/structures/75.png", title: "VÍDEO WALL" },
    { src: "/structures/76.png", title: "CO2" },
    { src: "/structures/77.png", title: "SOM" },
    { src: "/structures/78.png", title: "ILUMINAÇÃO" },
    { src: "/structures/79.png", title: "TENDAS E ESTRUTURA" },
    { src: "/structures/80.png", title: "EQUIPAMENTOS" },
  ];

  return (
    <div className="sm:px-8">
      <h2 className="p-8 text-center">
        <span className="font-bold">Oferecemos</span> estruturas que contam com:
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {items.map((item, index) => (
            <StructureItem
              key={index}
              src={item.src}
              alt={item.title}
              title={item.title}
            />
          ))}
          {items.map((item, index) => (
            <StructureItem
              key={index}
              src={item.src}
              alt={`duplicado-${item.title}`}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Structures;
