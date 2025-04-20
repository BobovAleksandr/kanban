import { TStore } from '@/app/types'

export const INITIAL_STATE:TStore = {
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
      cardIds: ["card-1", "card-4", "card-2"]
    },
    "column-2": {
      id: "column-2",
      title: "In work",
      titleColor: "#B0E0E6",
      cardIds: ["card-6"]
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
      cardIds: [""]
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      theme: "",
      imageUrl: "",
      description: "Пример самой простой карточки",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-2": {
      id: "card-2",
      theme: "Тоже тема 😎",
      imageUrl: "/images/cat.webp",
      description: "В карточку можно загрузить картинку с котиком",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-3": {
      id: "card-3",
      theme: "",
      imageUrl: "",
      description: "Колонки тоже можно добавлять и удалять, а еще менять цвет фона заголовка",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-4": {
      id: "card-4",
      theme: "Тема карточки",
      imageUrl: "",
      description: "У карточки может быть тема",
      tags: [],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-5": {
      id: "card-5",
      theme: "theme-5",
      imageUrl: "",
      description: "Task 5 with some description",
      tags: ["soon", "asap", "warning"],
      deadline: "06-06-06",
      onDelete: () => {
      }
    },
    "card-6": {
      id: "card-6",
      theme: "",
      imageUrl: "/images/dnd.webp",
      description: "Карточки можно перетаскивать между колонками, добавлять и удалять",
      tags: [],
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