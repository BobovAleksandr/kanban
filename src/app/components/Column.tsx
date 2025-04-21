"use client";

import useKanbanStore from "@/app/store/store";
import Card from "./Card";
import {TColumn} from "@/app/types";
import {selectCards} from "@/app/store/store";
import {Button} from "@/app/components/ui/button";
import {CornerRightDown} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/app/components/ui/sheet";
import ColumnSheetContent from "@/app/components/ColumnSheetContent";
import {Input} from "@/app/components/ui/input";
import {useForm, SubmitHandler} from "react-hook-form";
import {toast} from "sonner";
import {useDroppable} from "@dnd-kit/core";

type CardFormInputs = {
  description: string;
};

type ColumnProps = TColumn & {
  isActive: boolean;
};

export default function Column({id, title, cardIds, titleColor, isActive}: ColumnProps) {
  const cards = useKanbanStore(selectCards);
  const addCard = useKanbanStore((state) => state.addCard);

  const {setNodeRef} = useDroppable({
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
      onDelete: () => {
      },
    });
    reset();
  };

  return (
    <li className="max-w-[280px] w-full flex-shrink-0">
      <section
        ref={setNodeRef}
        className={`relative bg-white rounded-lg p-4 flex flex-col gap-4 transition-all duration-200 ${
          isActive ? "shadow-lg" : "shadow-none"
        }`}
        style={isActive ? {boxShadow: "0 0 4px var(--ring)"} : undefined}
      >
        <Sheet>
          <SheetTrigger asChild>
            <h2
              className="title-hover text-lg font-bold text-center block rounded-lg select-none hover:cursor-pointer"
              style={{backgroundColor: titleColor}}
            >
              {title}
            </h2>
          </SheetTrigger>
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
              <CornerRightDown/>
            </Button>
          </form>
          <SheetContent className="sm:max-w-100">
            <ColumnSheetContent
              id={id}
              title={title}
              titleColor={titleColor}
              cardIds={cardIds}
            />
          </SheetContent>
        </Sheet>
        <ul className="flex flex-col gap-4 empty:hidden">
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
                onDelete={() => {
                }}
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