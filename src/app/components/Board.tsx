"use client";

import useKanbanStore from "@/app/store/store";
import Column from "@/app/components/Column";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

export default function Board() {
  const columns = useKanbanStore((state) => state.columns);
  const moveCard = useKanbanStore((state) => state.moveCard);
  const moveCardInColumn = useKanbanStore((state) => state.moveCardInColumn);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id as string;
    const fromColumnId = active.data.current?.columnId as string;
    const toColumnId = over.data.current?.columnId as string;
    const toIndex = over.data.current?.index as number | undefined;

    if (fromColumnId === toColumnId) {
      // Moving within the same column
      const column = columns[fromColumnId];
      const oldIndex = column.cardIds.indexOf(cardId);
      if (toIndex !== undefined && oldIndex !== toIndex) {
        moveCardInColumn(fromColumnId, oldIndex, toIndex);
      }
    } else {
      // Moving to a different column
      moveCard(cardId, fromColumnId, toColumnId);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <main className="relative flex list-none w-full justify-center h-full">
        <ul className="flex gap-6 w-full justify-center h-full">
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cardIds={column.cardIds}
              titleColor={column.titleColor}
            />
          ))}
        </ul>
      </main>
    </DndContext>
  );
}