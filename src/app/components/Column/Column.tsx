"use client";

import useKanbanStore from "@/app/store/store";
import Card from "../Card/Card";
import { TColumn } from "@/app/types";
import { selectCards } from "@/app/store/store";

export default function Column({ title, cardIds }: TColumn) {
  const cards = useKanbanStore(selectCards);

  return (
    <li>
      <section className="bg-white rounded-lg p-4 h-auto">
        <h2>{title}</h2>
        <ul className="flex flex-col gap-4">
          {cardIds.map((cardId) => {
            const card = cards[cardId];
            if (!card) return null;
            return (
              <Card
                key={card.id}
                id={card.id}
                description={card.description}
                image={card.image}
                deadline={card.deadline}
                onDelete={() => {}}
                theme={card.theme}
                tags={card.tags}
              />
            );
          })}
        </ul>
      </section>
    </li>
  );
}
