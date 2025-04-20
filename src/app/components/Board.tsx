"use client";

import useKanbanStore from "@/app/store/store";
import Column from "@/app/components/Column";
import { DndContext, closestCenter, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { useState } from "react";

export default function Board() {
  const columns = useKanbanStore((state) => state.columns);
  const moveCard = useKanbanStore((state) => state.moveCard);
  const moveCardInColumn = useKanbanStore((state) => state.moveCardInColumn);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      const toColumnId = over.data.current?.columnId as string | undefined;
      setActiveColumnId(toColumnId || null);
    } else {
      setActiveColumnId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveColumnId(null);
      return;
    }

    const cardId = active.id as string;
    const fromColumnId = active.data.current?.columnId as string;
    const toColumnId = over.data.current?.columnId as string;
    const toIndex = over.data.current?.index as number | undefined;

    if (fromColumnId === toColumnId) {
      // Перемещение внутри колонки
      const column = columns[fromColumnId];
      const oldIndex = column.cardIds.indexOf(cardId);
      if (toIndex !== undefined && oldIndex !== toIndex) {
        moveCardInColumn(fromColumnId, oldIndex, toIndex);
      }
    } else {
      // Перемещение в другую колонку
      moveCard(cardId, fromColumnId, toColumnId);
    }

    setActiveColumnId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="relative flex list-none w-full justify-center h-full">
        <ul className="flex gap-6 w-full justify-center h-full">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cardIds={column.cardIds}
              titleColor={column.titleColor}
              isActive={activeColumnId === column.id}
            />
          ))}
        </ul>
      </main>
    </DndContext>
  );
}