"use client";
import GaleryListItem from "./galery-list-item";
interface GaleryListProps {
  itemSelected: number;
  setItemSelected: React.Dispatch<React.SetStateAction<number>>;
  events: {
    src: string;
    title: string;
    type: string;
    locale: string;
    date: string;
  }[];
}

const GaleryList = ({
  itemSelected,
  setItemSelected,
  events,
}: GaleryListProps) => {
  return (
    <div className="no-scrollbar flex gap-4 overflow-scroll p-2 lg:p-8">
      {events.map((event, index) => (
        <div
          className="relative"
          key={index}
          onClick={() => {
            console.log(index);
            setItemSelected(index);
          }}
        >
          <GaleryListItem
            index={index}
            selected={index === itemSelected}
            event={event}
          />
        </div>
      ))}
    </div>
  );
};

export default GaleryList;
