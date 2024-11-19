import { create } from "zustand";
import { ListItem } from "./api/getListData";

export type State = {
    list: ListItem[]; // Główna lista kart
    deletedList: ListItem[]; // Lista usuniętych kart
    expandedCardsList: ListItem['id'][]; // Lista ID rozwiniętych kart
};

export type Actions = {
    setList: (list: ListItem[]) => void; // Ustawia listę kart
    setDeletedList: (list: ListItem[]) => void; // Ustawia listę usuniętych kart
    expandCard: (id: ListItem['id']) => void; // Dodaje kartę do rozwiniętych
    hideCard: (id: ListItem['id']) => void; // Usuwa kartę z rozwiniętych
    addCard: (card: ListItem) => void; // Dodaje nową kartę do listy
    deleteCard: (id: ListItem['id']) => void; // Usuwa kartę i przenosi ją do usuniętych
    revealDeletedCards: () => void; // Przywraca wszystkie usunięte karty do listy
    clearDeletedCards: () => void; // Czyści listę usuniętych kart
};

export type Selectors = {
    visibleCards: () => ListItem[]; // Zwraca widoczne karty
    deletedCards: () => ListItem[]; // Zwraca usunięte karty
    extendedCards: () => ListItem['id'][]; // Zwraca ID rozwiniętych kart
    isExpanded: (id: ListItem['id']) => boolean; // Sprawdza, czy karta jest rozwinięta
};

export const useStore = create<State & Actions & Selectors>((set, get) => ({
    // Stan początkowy
    list: [],
    deletedList: [],
    expandedCardsList: [],

    // Akcje
    setList: (list) => set({ list }),
    setDeletedList: (deletedList) => set({ deletedList }),

    expandCard: (id) => set((state) => (
        console.log(state.expandedCardsList),
        {
       
        expandedCardsList: state.expandedCardsList.includes(id)
            ? state.expandedCardsList // Jeśli już rozwinięte, nic nie zmieniaj
            : [...state.expandedCardsList, id], // Dodaj ID karty do listy
    }
)),

    hideCard: (id) => set((state) => ({
        expandedCardsList: state.expandedCardsList.filter((cardId) => cardId !== id),
    })),

    addCard: (card) => set((state) => ({
        list: [...state.list, card],
    })),

    deleteCard: (id) => set((state) => {
        const cardToDelete = state.list.find((card) => card.id === id);
        return {
            list: state.list.filter((card) => card.id !== id),
            deletedList: cardToDelete ? [...state.deletedList, cardToDelete] : state.deletedList,
        };
    }),

    revealDeletedCards: () => set((state) => ({
        list: [...state.list, ...state.deletedList],
        deletedList: [],
    })),

    clearDeletedCards: () => set({ deletedList: [] }),

    // Selektory
    visibleCards: () => get().list,
    deletedCards: () => get().deletedList,
    extendedCards: () => get().expandedCardsList,
    isExpanded: (id) => get().expandedCardsList.includes(id),
}));