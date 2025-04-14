"use client";

import Board from "@/app/components/Board/Board";
import useKanbanStore from "./store/store";
import { selectBoards } from "./store/store";

export default function Home() {
  const boards = useKanbanStore(selectBoards);

  return (
    <>
      {Object.values(boards).map((board) => (
        <Board key={board.id} />
      ))}
    </>
  );
}
