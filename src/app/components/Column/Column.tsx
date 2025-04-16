"use client";

import useKanbanStore from "@/app/store/store";
import Card from "../Card/Card";
import {TColumn} from "@/app/types";
import {selectCards} from "@/app/store/store";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import ColumnSheetContent from "@/app/components/ColumnSheetContent/ColumnSheetContent";

export default function Column({id, title, cardIds, titleColor}: TColumn) {
  const cards = useKanbanStore(selectCards);

  return (
    <li className="max-w-[300px] w-full flex-shrink-0">
      <section className="relative group bg-white rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4 text-center block rounded-lg" style={{backgroundColor: titleColor}}>
          {title}
          </h2>
        <Sheet>
          <SheetContent className="sm:max-w-120">
            <ColumnSheetContent
              id={id}
              title={title}
              titleColor={titleColor}
              cardIds={cardIds}
            />
          </SheetContent>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 w-7 h-7 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <Menu/>
            </Button>
          </SheetTrigger>
        </Sheet>
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
                onDelete={() => {
                }}
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
