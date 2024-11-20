import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "./api/getListData";

export type State = {
  list: ListItem[];
  deletedCards: ListItem[];
  deletedCardsVisible: boolean;
  expandedCards: number[];
  isError: boolean;
  isLoading: boolean;
  setList: (data: ListItem[]) => void;
  deleteCard: (id: number) => void;
  toggleExpand: (id: number) => void;
  revealDeletedCards: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
};

export const useListStore = create<State>()(
  persist(
    (set, get) => ({
      list: [],
      deletedCards: [],
      deletedCardsVisible: false,
      expandedCards:
        JSON.parse(localStorage.getItem("list-store") || "{}").expandedCards ||
        [],
      isError: false,
      isLoading: false,
      setList: (data: ListItem[]) => set({ list: data }),
      deleteCard: (id: ListItem["id"]) => {
        const { list, deletedCards } = get() as State;
        // im using ListItem with description available for future "reveal" feature.
        const card = list.find((item: ListItem) => item.id === id);
        if (card) {
          set({
            list: list.filter((item) => item.id !== id),
            deletedCards: [
              ...deletedCards,
              {
                id: card.id,
                title: card.title,
                description: card.description,
                isVisible: false,
              },
            ],
          });
        }
      },
      toggleExpand: (id) => {
        const { expandedCards } = get() as State;
        const updatedSet = new Set(expandedCards);
        if (updatedSet.has(id)) {
          updatedSet.delete(id);
        } else {
          updatedSet.add(id);
        }
        set({ expandedCards: Array.from(updatedSet) });
      },
      revealDeletedCards: () => {
        set(() => ({
          deletedCardsVisible: true,
        }));
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: boolean) => set({ isError: error }),
    }),
    {
      name: "list-store",
      partialize: (state: State) => ({
        list: state.list,
        deletedCards: state.deletedCards,
        deletedCardsVisible: state.deletedCardsVisible,
        expandedCards: state.expandedCards,
        isError: state.isError,
        isLoading: state.isLoading,
      }),
    }
  )
);
