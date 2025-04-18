"use client";

import useKanbanStore from "@/app/store/store";
import Column from "@/app/components/Column";

export default function Board() {
  const columns = useKanbanStore((state) => state.columns);

  return (
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
  );
}
