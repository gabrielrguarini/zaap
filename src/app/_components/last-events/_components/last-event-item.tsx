const LastEventItem = () => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black px-8 py-2">
      <div className="flex items-center justify-start gap-1 text-start">
        <p className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
          14
        </p>
        <span className="font-semibold">AGO</span>
      </div>
      <h4 className="bg-gradient-to-r from-[#ffb400] to-[#ff4800] bg-clip-text text-center text-3xl font-bold text-transparent">
        Maria Xavier
      </h4>
      <p>15 Anos - Espera Feliz</p>
      <div className="rounded-md bg-gradient-to-r from-[#ffb400] to-[#ff4800] p-[2px]">
        <button className="rounded-md bg-black px-2">Ver evento</button>
      </div>
    </div>
  );
};

export default LastEventItem;
