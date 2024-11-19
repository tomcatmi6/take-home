import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ id, title, description }) => {
  // Użycie selektora `isExpanded` dla tej konkretnej karty
  const isExpanded = useStore((state) => state.isExpanded(id));
  const expandCard = useStore((state) => state.expandCard);
  const hideCard = useStore((state) => state.hideCard);

  // Obsługa kliknięcia rozwijania/zamykania
  const handleExpandClick = () => {
    if (isExpanded) {
      hideCard(id); // Zwijamy kartę
    } else {
      expandCard(id); // Rozwijamy kartę
    }
  };

  return (
    <article className="border border-black px-2 py-1.5">
      <header className="flex justify-between mb-0.5">
        <h2 className="font-medium">{title}</h2>
        <div className="flex">
          <ExpandButton onClick={handleExpandClick}>
            {isExpanded ? <ChevronUpIcon /> : "Expand"}
          </ExpandButton>
          <DeleteButton />
        </div>
      </header>
      {isExpanded && <p className="text-sm">{description}</p>}
    </article>
  );
};