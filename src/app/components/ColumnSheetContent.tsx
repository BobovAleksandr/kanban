"use client";

import { TColumn } from "@/app/types";
import { Input } from "@/components/ui/input";
import { SheetTitle, SheetDescription } from "@/components/ui/sheet";
import useKanbanStore from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import useDebounce from "@/hooks/useDebounce";
import DeletePopover from "./DeletePopover";

export default function ColumnSheetContent({ id, title, titleColor }: TColumn) {

  const [columnTitle, setColumnTitle] = useState<string>(title);
  const [columnTitleColor, setColumnTitleColor] = useState<string>(titleColor);

  const updateTitle = useKanbanStore(state => state.updateColumnTitle);
  const updateColor = useKanbanStore(state => state.updateColumnTitleColor);

  const deleteColumn = useKanbanStore(state => state.deleteColumn);

  const debouncedColor = useDebounce(columnTitleColor, 100);
  const debouncedTitle = useDebounce(columnTitle, 300);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (newTitle === columnTitle) return;
    if (newTitle.trim() === "") {
      event.target.value = columnTitle;
      toast.error("Заголовок колонки не может быть пустым");
    } else {
      setColumnTitle(newTitle);
    }
  }

  const handleChangeTitleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitleColor(event.target.value);
  }
  
  useEffect(() => {
    updateColor(id, debouncedColor);
  }, [id, debouncedColor, updateColor])

  useEffect(() => {
    updateTitle(id, debouncedTitle);
  }, [id, debouncedTitle, updateTitle])

  useEffect(() => {
    console.log('Тест в компоненте');
    console.warn('Тест warn');
    console.error('Тест error');
    console.log('Тип console.log:', console.log.toString()); // Должно быть "function log() { [native code] }"
  }, []);

  return (
    <div className="p-4 flex flex-col h-full justify-between gap-8">
      <div className="pt-8 flex gap-4 flex-col">
        <div className="text-sm text-(--ring)">
          <SheetTitle>
            <Label htmlFor="title" className="mb-2 text-accent-foreground">Заголовок колонки</Label>
            <Input
              id="title"
              placeholder="Тема"
              maxLength={25}
              value={columnTitle}
              list="theme-suggestions"
              onChange={handleTitleChange}
              className="hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl mb-6"
            />
          </SheetTitle>
          <SheetDescription>
            <Label htmlFor="color" className="mb-2 text-accent-foreground">Цвет заголовка</Label>
            <Input className="max-w-1/2" type="color" value={columnTitleColor} onChange={handleChangeTitleColor} />
          </SheetDescription>
        </div>
      </div>
      <DeletePopover id={id} buttonTitle={"Удалить колонку"} onDelete={() => { deleteColumn(id) }}/>
    </div>
  )
}