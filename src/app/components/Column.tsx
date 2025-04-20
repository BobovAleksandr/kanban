"use client";

import useKanbanStore from "@/app/store/store";
import Card from "./Card";
import { TColumn } from "@/app/types";
import { selectCards } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ColumnSheetContent from "@/app/components/ColumnSheetContent";
import { Input } from "@/components/ui/input";
import { CornerRightDown } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useDroppable } from "@dnd-kit/core";

type CardFormInputs = {
  description: string;
};

export default function Column({ id, title, cardIds, titleColor }: TColumn) {
  const cards = useKanbanStore(selectCards);
  const addCard = useKanbanStore((state) => state.addCard);

  const { setNodeRef } = useDroppable({
    id: `column-${id}`,
    data: {
      columnId: id,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CardFormInputs>();

  const onSubmit: SubmitHandler<CardFormInputs> = (data) => {
    if (data.description.trim() === "") {
      toast.error("Это поле не может быть пустым");
      return;
    }

    addCard(id, {
      id: Date.now().toString(),
      description: data.description,
      imageUrl: "",
      deadline: "",
      theme: "",
      tags: [],
      columnId: id,
      onDelete: () => {},
    });
    reset();
  };

  return (
    <li className="max-w-[280px] w-full flex-shrink-0">
      <section
        ref={setNodeRef}
        className="relative group bg-white rounded-lg p-4 flex flex-col gap-4"
      >
        <h2
          className="text-lg font-bold text-center block rounded-lg"
          style={{ backgroundColor: titleColor }}
        >
          {title}
        </h2>
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Добавить карточку"
            minLength={1}
            required
            autoComplete="off"
            {...register("description")}
          />
          <Button variant="ghost" size="icon" type="submit">
            <CornerRightDown />
          </Button>
        </form>
        <Sheet>
          <SheetContent className="sm:max-w-100">
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
              <Menu />
            </Button>
          </SheetTrigger>
        </Sheet>
        <ul className="flex flex-col gap-4">
          {cardIds.map((cardId, index) => {
            const card = cards[cardId];
            if (!card) return null;
            return (
              <Card
                key={card.id}
                id={card.id}
                description={card.description}
                imageUrl={card.imageUrl}
                deadline={card.deadline}
                onDelete={() => {}}
                theme={card.theme}
                tags={card.tags}
                columnId={id}
                index={index}
              />
            );
          })}
        </ul>
      </section>
    </li>
  );
}