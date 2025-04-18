import { create } from 'zustand'
import { TCard, TColumn, TState } from '../types';
import { devtools } from 'zustand/middleware';


const initialState = {
  boards: {
    "board-1": {
      id: "board-1",
      title: "New Board",
      columnIds: ["column-1", "column-2", "column-3", "column-4"]
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Upcoming",
      titleColor: "#FFFACD",
      cardIds: ["card-1", "card-5"]
    },
    "column-2": {
      id: "column-2",
      title: "In work",
      titleColor: "#B0E0E6",
      cardIds: ["card-2"]
    },
    "column-3": {
      id: "column-3",
      title: "Fix",
      titleColor: "#F08080",
      cardIds: ["card-3"]
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      titleColor: "#98FB98",
      cardIds: ["card-4"]
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      theme: "",
      imageUrl: "/images/image-1.jpg",
      description: "Task 1 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-2": {
      id: "card-2",
      theme: "theme-2",
      imageUrl: "",
      description: "Task 2 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-3": {
      id: "card-3",
      theme: "theme-3",
      imageUrl: "/images/image-3.jpg",
      description: "Task 3 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-4": {
      id: "card-4",
      theme: "theme-4",
      imageUrl: "/images/image-4.jpg",
      description: "Task 4 with some description",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-5": {
      id: "card-5",
      theme: "theme-5",
      imageUrl: "/images/image-4.jpg",
      description: "Task 5 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
  },
  tags: {
    "Важно": {
      id: "important",
      color: "red"
    },
    "Не срочно": {
      id: "not urgent",
      color: "lightblue"
    },
    "Заметка": {
      id: "note",
      color: "lightyellow"
    }
  }
}

const useKanbanStore = create<TState>()(
  devtools( // Оборачиваем весь store в devtools
    (set, get) => ({
      ...initialState,
      updateColumnTitle: (id: string, title: string) => {
        set(
          (state) => ({
            columns: {
              ...state.columns,
              [id]: {
                ...state.columns[id],
                title
              }
            }
          }),
          false,
          'updateColumnTitle' // Название действия для DevTools
        );
      },
      updateColumnTitleColor: (id: string, titleColor: string) => {
        set(
          (state) => ({
            columns: {
              ...state.columns,
              [id]: {
                ...state.columns[id],
                titleColor
              }
            }
          }),
          false,
          'updateColumnTitleColor'
        );
      },
      updateCardDescription: (id: string, description: string) => {
        set(
          (state) => ({
            cards: {
              ...state.cards,
              [id]: {
                ...state.cards[id],
                description
              }
            }
          }),
          false,
          'updateCardDescription'
        );
      },
      updateCardImage: (id: string, imageUrl: string) => {
        set(
          (state) => ({
            cards: {
              ...state.cards,
              [id]: {
                ...state.cards[id],
                imageUrl
              }
            }
          }),
          false,
          'updateCardImage'
        );
      },
      updateCardTheme: (id: string, theme: string) => {
        set(
          (state) => ({
            cards: {
              ...state.cards,
              [id]: {
                ...state.cards[id],
                theme
              }
            }
          }),
          false,
          'updateCardTheme'
        );
      },

      addCard: (columnId: string, card: TCard) => {
        set((state) => ({
          cards: {
            ...state.cards,
            [card.id]: card
          },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              cardIds: [...state.columns[columnId].cardIds, card.id]
            }
          }
        }),
          false,
          'addCard'
        )
      },
      deleteCard: (id: string) => {
        set(
          (state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...restCards } = state.cards;
            const updatedColumns = { ...state.columns };
            Object.keys(updatedColumns).forEach((columnId) => {
              updatedColumns[columnId] = {
                ...updatedColumns[columnId],
                cardIds: updatedColumns[columnId].cardIds.filter((cardId) => cardId !== id),
              };
            });
            return {
              cards: restCards,
              columns: updatedColumns,
            };
          },
          false,
          'deleteCard'
        );
      },
      addColumn: (columnData: TColumn) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnData.id]: columnData
          }
        }),
        false,
        'addColumn')
      },
      deleteColumn: (id: string) => {
        set(
          (state) => {
            const { [id]: deletedColumn, ...remainingColumns } = state.columns;
            const cardsToRemove = deletedColumn.cardIds;

            const updatedCards = { ...state.cards };
            cardsToRemove.forEach(cardId => {
              delete updatedCards[cardId];
            });

            const updatedBoards = { ...state.boards };
            Object.keys(updatedBoards).forEach(boardId => {
              updatedBoards[boardId] = {
                ...updatedBoards[boardId],
                columnIds: updatedBoards[boardId].columnIds.filter(columnId => columnId !== id)
              };
            });

            return {
              columns: remainingColumns,
              boards: updatedBoards,
              cards: updatedCards
            };
          },
          false,
          'deleteColumn'
        );
      }
    }),
    {
      name: 'KanbanStore', // Имя хранилища в DevTools
      enabled: process.env.NODE_ENV !== 'production' // Включаем только в development
    }
  )
);


// selectors

export const selectCards = (state: TState) => state.cards;
export const selectBoards = (state: TState) => state.boards;
export const selectColumns = (state: TState) => state.columns;
export const selectColumnById = (id: string) => (state: TState) => state.columns[id];
export const selectBoardById = (id: string) => (state: TState) => state.boards[id];
export const selectCardById = (id: string) => (state: TState) => state.cards[id];
export const selectAllThemes = (state: TState) => {
  const themes = Object.values(state.cards).map(card => card.theme?.trim()).filter(Boolean);
  return [...new Set(themes)];
}

export default useKanbanStore;