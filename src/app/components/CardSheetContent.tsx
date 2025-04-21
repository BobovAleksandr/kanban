"use client";

import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { SheetTitle } from "@/app/components/ui/sheet";
import React from "react";
import useKanbanStore, { selectAllThemes } from "@/app/store/store";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { useShallow } from "zustand/react/shallow";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import DeletePopover from "./DeletePopover";
import { Label } from "@/app/components/ui/label";
import uploadImage from '@/app/utils/loadImage'

interface CardSheetContentProps {
  id: string;
  imageUrl?: string;
  theme?: string;
  description: string;
  tags?: string[];
}

export function CardSheetContent({
  id,
  imageUrl,
  theme,
  description,
  tags,
}: CardSheetContentProps) {

  const updateCardText = useKanbanStore((state) => state.updateCardDescription);
  const updateThemeText = useKanbanStore((state) => state.updateCardTheme);
  const updateCardImage = useKanbanStore((state) => state.updateCardImage);
  const deleteCard = useKanbanStore((state) => state.deleteCard);
  const themes = useKanbanStore(useShallow(selectAllThemes));

  const handleUpdateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loadingToastId = toast.loading('Загрузка изображения...');

    try {
      const result = await uploadImage(file);

      if (result?.error) {
        toast.error(result.error.message, { id: loadingToastId });
        return;
      }

      if (result?.data?.link) {
        updateCardImage(id, result.data.link);
        toast.success('Изображение загружено', { id: loadingToastId });
      } else {
        toast.error('Не получили ссылку на изображение', { id: loadingToastId });
      }

    } catch {
      toast.error('Неизвестная ошибка', { id: loadingToastId });
    } finally {
      event.target.value = '';
    }
  };

  const handleDeleteImage = () => {
    updateCardImage(id, '')
  }

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === theme) return;
    updateThemeText(id, newValue);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (newValue === description) return;
    if (newValue.trim() === "") {
      event.target.value = description;
      toast.error("Описание карточки не может быть пустым");
    } else {
      updateCardText(id, newValue);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full justify-between gap-8">
      <div className="pt-8 flex gap-8 flex-col">
        <div className="text-sm text-(--ring) flex flex-col">
          <Label htmlFor="image" className="mb-2 text-accent-foreground">
            Изображение карточки
          </Label>
          {imageUrl ?
            <div className="w-full relative group aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="task"
                fill
                className="object-cover object-center block"
              />
              <div
                className="absolute flex opacity-0 right-2 top-2 group-hover:opacity-100 group-hover:bg-card transition-all duration-200 rounded-md">
                <Label className="w-8 h-8 hover:bg-accent rounded-md flex justify-between items-center">
                  <Input type="file" className="w-0 h-0 hidden opacity-0" onChange={handleUpdateImage}
                    accept="image/*" />
                  <Pencil className="w-4.5 h-4.5 block mx-auto text-accent-foreground" />
                </Label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-accent text-accent-foreground"
                  onClick={handleDeleteImage}
                >
                  <Trash />
                </Button>
              </div>
            </div>
            :
            <Input id="image" type="file" className="" onChange={handleUpdateImage} accept="image/*" />
          }
        </div>
        <div className="text-sm text-(--ring)">
          <Label htmlFor="theme" className="mb-2 text-accent-foreground">Тема</Label>
          <Input
            id="theme"
            maxLength={100}
            defaultValue={theme ?? ""}
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
          <Label htmlFor="description" className="mb-2 text-accent-foreground">Описание</Label>
          <Textarea
            id="description"
            maxLength={300}
            defaultValue={description}
            onBlur={handleDescriptionChange}
            className="text-accent-foreground hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl"
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
      <DeletePopover id={id} buttonTitle="Удалить карточку" onDelete={deleteCard} />
    </div>
  );
}
