export type TBoard = {
  id: string;
  title: string,
  columnIds: string[];
}

export type TColumn = {
  id: string;
  title: string,
  cardIds: string[];
  titleColor: string,
}

export type TCard = {
  id: string;
  theme?: string;
  image?: string;
  description: string;
  tags?: string[];
  deadline?: string;
  onDelete: (id: string) => void;
}

export type TTag = {
  id: string;
  color: string;
}

export type TState = {
  boards: Record<string, TBoard>;
  columns: Record<string, TColumn>;
  cards: Record<string, TCard>;
  tags: Record<string, TTag>;
  updateCardTheme: (id: string, description: string) => void;
  updateCardDescription: (id: string, description: string) => void;
  updateColumnTitle: (id: string, title: string) => void;
  deleteCard: (id: string) => void;
}