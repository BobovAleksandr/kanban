"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import useKanbanStore, { selectAllThemes } from "@/app/store/store";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input";
import { useShallow } from 'zustand/react/shallow';
import { Trash, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button";

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

  const updateCardtext = useKanbanStore(state => state.updateDescription);
  const updateThemetext = useKanbanStore(state => state.updateTheme);
  const themes = useKanbanStore(useShallow(selectAllThemes));

  const handleUpdateImage = (newImage: string) => {
    // Update image logic here
  }

  const handleThemeChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    updateThemetext(id, newValue);
    setThemeText(newValue);
  };

  // TODO - добавить чекбоксы с подзадачами

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    if (newValue === descriptionText) return;
    if (newValue.trim() === '') {
      // TODO - попап с ошибкой
    }
    updateCardtext(id, newValue);
    setDescriptionText(newValue);
  };

  return (
    <div className="p-4 pt-12 flex gap-4 flex-col">
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
              onClick={() => { }}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-gray-300"
              onClick={() => { }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      )}
      <div className="text-sm text-blue-300">
        <Input placeholder="Тема" defaultValue={themeText ?? ''} list="theme-suggestions" onBlur={handleThemeChagne} className="hover:border-inherit transition-all duration-200 border-accent shadow-none" />
        <datalist id="theme-suggestions">
          {themes.map((themeOption) => (
            <option key={themeOption} value={themeOption} />
          ))}
        </datalist>
      </div>
      <SheetTitle>
        <Textarea defaultValue={descriptionText} onBlur={handleDescriptionChange} className="hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl" />
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
  );
}