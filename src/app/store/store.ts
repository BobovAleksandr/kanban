import { create } from 'zustand';
import { TCard, TColumn, TState } from '../types';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { INITIAL_STATE } from '@/app/lib/mock';

const useKanbanStore = create<TState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,
        updateColumnTitle: (id: string, title: string) => {
          set(
            (state) => ({
              columns: {
                ...state.columns,
                [id]: {
                  ...state.columns[id],
                  title,
                },
              },
            }),
            false,
            'updateColumnTitle'
          );
        },
        updateColumnTitleColor: (id: string, titleColor: string) => {
          set(
            (state) => ({
              columns: {
                ...state.columns,
                [id]: {
                  ...state.columns[id],
                  titleColor,
                },
              },
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
                  description,
                },
              },
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
                  imageUrl,
                },
              },
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
                  theme,
                },
              },
            }),
            false,
            'updateCardTheme'
          );
        },
        addCard: (columnId: string, card: TCard) => {
          set(
            (state) => ({
              cards: {
                ...state.cards,
                [card.id]: card,
              },
              columns: {
                ...state.columns,
                [columnId]: {
                  ...state.columns[columnId],
                  cardIds: [...state.columns[columnId].cardIds, card.id],
                },
              },
            }),
            false,
            'addCard'
          );
        },
        deleteCard: (id: string) => {
          set(
            (state) => {
              const { [id]: _, ...restCards } = state.cards;
              const updatedColumns = { ...state.columns };

              Object.keys(updatedColumns).forEach((columnId) => {
                updatedColumns[columnId] = {
                  ...updatedColumns[columnId],
                  cardIds: updatedColumns[columnId].cardIds.filter(
                    (cardId) => cardId !== id
                  ),
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
        moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => {
          set(
            (state) => {
              if (fromColumnId === toColumnId) return state;

              const fromColumn = state.columns[fromColumnId];
              const toColumn = state.columns[toColumnId];

              const updatedFromColumn = {
                ...fromColumn,
                cardIds: fromColumn.cardIds.filter((id) => id !== cardId),
              };

              const updatedToColumn = {
                ...toColumn,
                cardIds: [...toColumn.cardIds, cardId],
              };

              return {
                columns: {
                  ...state.columns,
                  [fromColumnId]: updatedFromColumn,
                  [toColumnId]: updatedToColumn,
                },
              };
            },
            false,
            'moveCard'
          );
        },
        moveCardInColumn: (columnId: string, oldIndex: number, newIndex: number) => {
          set(
            (state) => {
              const column = state.columns[columnId];
              const newCardIds = [...column.cardIds];
              const [removed] = newCardIds.splice(oldIndex, 1);
              newCardIds.splice(newIndex, 0, removed);

              return {
                columns: {
                  ...state.columns,
                  [columnId]: {
                    ...column,
                    cardIds: newCardIds,
                  },
                },
              };
            },
            false,
            'moveCardInColumn'
          );
        },
        addColumn: (columnData: TColumn) => {
          set(
            (state) => ({
              columns: {
                ...state.columns,
                [columnData.id]: columnData,
              },
            }),
            false,
            'addColumn'
          );
        },
        deleteColumn: (id: string) => {
          set(
            (state) => {
              const { [id]: deletedColumn, ...remainingColumns } = state.columns;
              const cardsToRemove = deletedColumn.cardIds;

              const updatedCards = { ...state.cards };
              cardsToRemove.forEach((cardId) => {
                delete updatedCards[cardId];
              });

              const updatedBoards = { ...state.boards };
              Object.keys(updatedBoards).forEach((boardId) => {
                updatedBoards[boardId] = {
                  ...updatedBoards[boardId],
                  columnIds: updatedBoards[boardId].columnIds.filter(
                    (columnId) => columnId !== id
                  ),
                };
              });

              return {
                columns: remainingColumns,
                boards: updatedBoards,
                cards: updatedCards,
              };
            },
            false,
            'deleteColumn'
          );
        },
      }),
      {
        name: 'kanban-storage',
        storage: createJSONStorage(() => localStorage),
        version: 1,
      }
    ),
    {
      name: 'KanbanStore',
      enabled: process.env.NODE_ENV !== 'production',
    }
  )
);

// Селекторы
export const selectCards = (state: TState) => state.cards;
export const selectBoards = (state: TState) => state.boards;
export const selectAllThemes = (state: TState) => {
  const themes = Object.values(state.cards)
    .map((card) => card.theme?.trim())
    .filter(Boolean);
  return [...new Set(themes)];
};

export default useKanbanStore;