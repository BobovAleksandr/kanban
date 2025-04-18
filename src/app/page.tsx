"use client";

import Board from "@/app/components/Board";
import useKanbanStore from "./store/store";
import { selectBoards } from "./store/store";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HomeSheetContent from "./components/HomeSheetContent";

export default function Home() {
  const boards = useKanbanStore(selectBoards);

  return (
    <>
      <Sheet>
        <SheetContent className="sm:max-w-100" side="left">
          <HomeSheetContent />
        </SheetContent>
        <SheetTrigger asChild>
          <Button variant="outline" size="lg" className="absolute top-4 left-4 z-5">
            <Settings2 />
          </Button>
        </SheetTrigger>
      </Sheet>
      {Object.values(boards).map((board) => (
        <Board key={board.id} />
      ))}
    </>
  );
}
