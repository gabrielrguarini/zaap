import { useRef, useEffect } from "react";
import GalleryListItem from "./gallery-list-item";
import { Gallery } from "@prisma/client";

interface GalleryListProps {
  itemSelected: number;
  setItemSelected: React.Dispatch<React.SetStateAction<number>>;
  events: Gallery[];
}

const GalleryList = ({
  itemSelected,
  setItemSelected,
  events,
}: GalleryListProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      const selectedItem = listRef.current.children[
        itemSelected
      ] as HTMLElement;

      if (selectedItem) {
        const container = listRef.current;
        const containerWidth = container.offsetWidth;
        const itemLeft = selectedItem.offsetLeft;
        const itemRight = itemLeft + selectedItem.offsetWidth;

        if (
          itemLeft < container.scrollLeft ||
          itemRight > container.scrollLeft + containerWidth
        ) {
          container.scrollTo({
            left: itemLeft,
            behavior: "smooth",
          });
        }
      }
    }
  }, [itemSelected]);

  return (
    <div
      ref={listRef}
      className="no-scrollbar flex w-full gap-4 overflow-scroll p-2 lg:p-8"
    >
      {events.map((event, index) => (
        <div
          className="relative"
          key={index}
          onClick={() => setItemSelected(index)}
        >
          <GalleryListItem selected={index === itemSelected} event={event} />
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
