"use client";

import { TColumn } from "@/app/types";
import { Input } from "@/app/components/ui/input";
import { SheetTitle, SheetDescription } from "@/app/components/ui/sheet";
import useKanbanStore from "@/app/store/store";
import React, { useCallback } from "react";
import { Label } from "@/app/components/ui/label"
import { toast } from "sonner";
import { debounce } from "lodash";
import DeletePopover from "./DeletePopover";

export default function ColumnSheetContent({ id, title, titleColor }: TColumn) {

  const updateTitle = useKanbanStore(state => state.updateColumnTitle);
  const updateColor = useKanbanStore(state => state.updateColumnTitleColor);
  const deleteColumn = useKanbanStore(state => state.deleteColumn);

  const debouncedUpdateColor = useCallback(
    debounce((columnId: string, color: string) => {
      updateColor(columnId, color);
    }, 200),
    [] 
  )

  const debouncedUpdateTitle = useCallback(
    debounce((columnId: string, title: string) => {
      updateTitle(columnId, title);
    }, 200),
    [] 
  )

  const handleChangeTitleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUpdateColor(id, event.target.value);
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    if (newTitle.trim() === "") {
      event.target.value = title;
      toast.error("Заголовок колонки не может быть пустым");
    } else {
      debouncedUpdateTitle(id, newTitle);
    }
  }

  return (
    <div className="p-4 flex flex-col h-full justify-between gap-8">
      <div className="pt-8 flex gap-4 flex-col">
        <div className="text-sm text-(--ring)">
          <SheetTitle>
            <Label htmlFor="title" className="mb-2 text-accent-foreground">Заголовок колонки</Label>
            <Input
              id="title"
              maxLength={25}
              defaultValue={title}
              onChange={handleChangeTitle}
              className="text-accent-foreground hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl mb-6"
            />
          </SheetTitle>
          <SheetDescription>
            <Label htmlFor="color" className="mb-2 text-accent-foreground">Цвет заголовка</Label>
            <Input className="max-w-1/2" type="color" value={titleColor} onChange={handleChangeTitleColor} />
          </SheetDescription>
        </div>
      </div>
      <DeletePopover id={id} buttonTitle={"Удалить колонку"} onDelete={() => { deleteColumn(id) }}/>
    </div>
  )
}