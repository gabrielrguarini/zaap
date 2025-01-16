const GalerySkeleton = ({ text }: { text: string }) => {
  return (
    <div className="">
      <div className="relative flex h-[212px] w-full items-center justify-center rounded-3xl bg-black/20 lg:h-[424px]">
        <h1 className="text-center text-3xl font-bold text-white">{text}</h1>
      </div>
    </div>
  );
};

export default GalerySkeleton;
