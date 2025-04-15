"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import useKanbanStore, { selectAllThemes } from "@/app/store/store";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useShallow } from "zustand/react/shallow";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

interface CardSheetContentProps {
  id: string;
  image?: string;
  theme?: string;
  description: string;
  tags?: string[];
}

export function CardSheetContent({
  id,
  image,
  theme,
  description,
  tags,
}: CardSheetContentProps) {
  const [descriptionText, setDescriptionText] = useState(description);
  const [themeText, setThemeText] = useState(theme);

  const updateCardText = useKanbanStore((state) => state.updateCardDescription);
  const updateThemeText = useKanbanStore((state) => state.updateCardTheme);
  const deleteCard = useKanbanStore((state) => state.deleteCard);
  const themes = useKanbanStore(useShallow(selectAllThemes));

  const handleUpdateImage = (newImage: string) => {
    // Update image logic here
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    updateThemeText(id, newValue);
    setThemeText(newValue);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (newValue === descriptionText) return;
    if (newValue.trim() === "") {
      event.target.value = descriptionText;
      toast.error("Поле текста задачи не может быть пустым");
    } else {
      updateCardText(id, newValue);
      setDescriptionText(newValue);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="pt-8 flex gap-4 flex-col">
        {image && (
          <div className="w-full relative group aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt="task"
              fill
              className="object-cover object-center block"
            />
            <div className="absolute flex bg-accent rounded-md opacity-0 right-2 top-2 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-gray-300"
                onClick={() => {}}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-gray-300"
                onClick={() => {}}
              >
                <Trash />
              </Button>
            </div>
          </div>
        )}
        <div className="text-sm text-(--ring)">
          <Input
            placeholder="Тема"
            maxLength={100}
            defaultValue={themeText ?? ""}
            list="theme-suggestions"
            onBlur={handleThemeChange}
            className="hover:border-inherit transition-all duration-200 border-accent shadow-none"
          />
          <datalist id="theme-suggestions">
            {themes.map((themeOption) => (
              <option key={themeOption} value={themeOption} />
            ))}
          </datalist>
        </div>
        <SheetTitle>
          <Textarea
            maxLength={300}
            defaultValue={descriptionText}
            onBlur={handleDescriptionChange}
            className="hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl"
          />
        </SheetTitle>
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <Badge variant="secondary" key={index}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Popover modal={true}>
        <PopoverTrigger className="mt-auto">
          <Button
            variant="outline"
            type="button"
            className="p-4 mt-auto ml-auto w-full"
          >
            Удалить задачу
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-4 w-72">
          <p>Удалить задачу?</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                deleteCard(id);
              }}
              type="button"
              className="w-30 p-4 mt-auto ml-auto"
            >
              Удалить
            </Button>
            <PopoverClose>
              <Button
                variant="outline"
                onClick={() => {}}
                type="button"
                className="w-30 p-4 mt-auto ml-auto"
              >
                Отмена
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
