"use client";

import useKanbanStore from "@/app/store/store";
import Card from "../Card/Card";
import { TColumn } from "@/app/types";
import { selectCards } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Column({ title, cardIds }: TColumn) {
  const cards = useKanbanStore(selectCards);

  // TODO - добавить возможность перетаскивания карточек
  // TODO - добавить возможность менять название колонки
  // TODO - добавить возможность менять цвет фона заголовка колонки

  return (
    <li className="max-w-[300px] w-full flex-shrink-0">
      <section className="relative group bg-white rounded-lg p-4 h-auto">
        <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Menu />
        </Button>
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
                onDelete={() => { }}
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
