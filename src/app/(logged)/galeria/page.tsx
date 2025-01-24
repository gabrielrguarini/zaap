import Image from "next/image";

export default function GaleryPage() {
  return (
    <main className="m-auto mt-4 flex min-h-full w-full max-w-5xl flex-col gap-2 md:gap-4">
      <div>
        <div className="flex flex-col gap-2">
          <div className={`relative h-72`}>
            <Image
              src={"/galery-list/0.jpg"}
              alt={"Search"}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 30 }).map((_, index) => {
              return (
                <div key={index} className="relative h-28 w-40">
                  <Image
                    src={"/galery-list/0.jpg"}
                    alt={"Search"}
                    fill
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
