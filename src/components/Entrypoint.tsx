import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useListStore } from "../store";
import { ButtonFactory, ButtonType } from "./ButtonFactory";

export const Entrypoint = () => {
  const {
    list,
    deletedCards,
    expandedCards,
    deletedCardsVisible,
    isLoading,
    isError,
    deleteCard,
    toggleExpand,
    revealDeletedCards,
  } = useListStore();
  const listQuery = useGetListData();
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);

  useEffect(() => {
    setVisibleCards(list);
  }, [list]);

  useEffect(() => {
    if (!isLoading && listQuery.data) {
      useListStore.setState({ list: listQuery.data });
    }
    console.log("List data updated:", listQuery);
  }, [isLoading, listQuery.data]);
  if (isLoading) {
    return <Spinner />;
  }
  const handleDelete = (id: number) => {
    // Temporarily keep the card in the DOM with a "fade-out" animation
    const cardToRemove = document.getElementById(`card-${id}`);
    if (cardToRemove) {
      cardToRemove.classList.add("animate-card-exit");
    }

    // Remove the card after the animation ends
    setTimeout(() => {
      deleteCard(id);
      setVisibleCards((prev) => prev.filter((card) => card.id !== id));
    }, 500); // Match the animation duration
  };

  const handleRefresh = () => {
    listQuery.refetch();
  };

  if (isError) {
    return (
      <div className="error-message">
        <p>⚠️ Failed to fetch data. Please try again later.</p>
        <button
          onClick={handleRefresh}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="flex gap-x-16">
      <section className="w-full max-w-xl" aria-labelledby="cards-list-heading">
        <div className="flex items-center justify-between">
          <h2 id="cards-list-heading" className="mb-1 font-medium text-lg">
            My Awesome List ({list.length})
          </h2>
          {ButtonFactory(ButtonType.REFRESH, {
            onClick: handleRefresh,
            disabled: isLoading,
          })}
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card: ListItem) => (
            <Card
              id={`card-${card.id}`}
              key={card.id}
              title={card.title}
              description={card.description}
              onToggleExpand={() => toggleExpand(card.id)}
              onDelete={() => handleDelete(card.id)}
              isExpanded={expandedCards.includes(card.id)}
            />
          ))}
        </div>
      </section>
      <section
        className="w-full max-w-xl"
        aria-labelledby="deleted-cards-list-heading"
        aria-live="polite"
      >
        <div className="flex items-center justify-between">
          <h2
            id="deleted-cards-list-heading"
            className="mb-1 font-medium text-lg"
          >
            Deleted Cards ({deletedCards.length})
          </h2>
          {ButtonFactory(ButtonType.REVEAL, {
            onClick: revealDeletedCards,
            disabled: isLoading || deletedCards.length === 0,
          })}
        </div>
        <div className="flex flex-col gap-y-3">
          {deletedCardsVisible &&
            deletedCards.map((card: ListItem) => (
              <Card
                id={`card-${card.id}`}
                key={card.id}
                title={card.title}
                isDeleted={true}
              />
            ))}
        </div>
      </section>
    </div>
  );
};
