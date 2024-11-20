import { FC } from "react";
import { ListItem } from "../api/getListData";
import { ButtonFactory, ButtonType } from "./ButtonFactory";

type CardProps = {
  id: string;
  title: ListItem["title"];
  description?: ListItem["description"];
  isExpanded?: boolean;
  isDeleted?: boolean;
  onToggleExpand?: () => void;
  onDelete?: () => void;
};

export const Card: FC<CardProps> = ({ id, title, description, isExpanded = false, isDeleted, onToggleExpand, onDelete }) => {
  return (
    <article id={id} className="border border-black px-2 py-1.5 animate-card"
      aria-labelledby={`card-title-${title}`}
      aria-describedby={description ? `card-desc-${title}` : undefined}
    >
      <header className="flex justify-between mb-0.5">
        <h3 id={`card-title-${title}`} className="font-medium">{title}</h3>
        {!isDeleted && (
          <div className="flex" role="group" aria-label="Card actions">
            {ButtonFactory(ButtonType.TOGGLE, { onClick: onToggleExpand, isExpanded })}
            {ButtonFactory(ButtonType.DELETE, { onClick: onDelete })}
          </div>
        )}
      </header>
      { description && <p id={`card-desc-${title}`} className={`text-sm card-description ${isExpanded ? 'expanded' : ''}`}>{description}</p>}
    </article>
  );
};