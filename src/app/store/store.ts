
import { create } from 'zustand'
import { TState } from '../types';


const initialState = {
  boards: {
    "board-1": {
      id: "board-1",
      title: "New Board",
      columnIds: ["Upcoming", "In work", "Fix", "Done"]
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Upcoming",
      cardIds: ["card-1", "card-5"]
    },
    "column-2": {
      id: "column-2",
      title: "In work",
      cardIds: ["card-2"]
    },
    "column-3": {
      id: "column-3",
      title: "Fix",
      cardIds: ["card-3"]
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      cardIds: ["card-4"]
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      theme: "",
      image: "/images/image-1.jpg",
      description: "Task 1 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => { }
    },
    "card-2": {
      id: "card-2",
      theme: "theme-2",
      image: "",
      description: "Task 2 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => { }
    },
    "card-3": {
      id: "card-3",
      theme: "theme-3",
      image: "/images/image-3.jpg",
      description: "Task 3 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => { }
    },
    "card-4": {
      id: "card-4",
      theme: "theme-4",
      image: "/images/image-4.jpg",
      description: "Task 4 with some description",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => { }
    },
    "card-5": {
      id: "card-5",
      theme: "theme-5",
      image: "/images/image-4.jpg",
      description: "Task 5 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => { }
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
const useKanbanStore = create<TState>(() => ({
  ...initialState,
  updateDescription: (id: string, description: string) => {
    useKanbanStore.setState((state) => ({
      cards: {
        ...state.cards,
        [id]: {
          ...state.cards[id],
          description
        }
      }
    }))
  },
  updateTheme: (id: string, theme: string) => {
    useKanbanStore.setState(state => ({
      cards: {
        ...state.cards,
        [id]: {
          ...state.cards[id],
          theme
        }
      }
    }))
  }
}))

export const selectCards = (state: TState) => state.cards;
export const selectBoards = (state: TState) => state.boards;
export const selectColumnById = (id: string) => (state: TState) => state.columns[id];
export const selectBoardById = (id: string) => (state: TState) => state.boards[id];
export const selectCardById = (id: string) => (state: TState) => state.cards[id];
export const selectAllThemes = (state: TState) => {
  const themes = Object.values(state.cards).map(card => card.theme?.trim()).filter(Boolean);
  return [...new Set(themes)];
}

export default useKanbanStore;