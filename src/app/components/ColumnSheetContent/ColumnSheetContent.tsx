"use client";

import {TColumn} from "@/app/types";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {SheetTitle} from "@/components/ui/sheet";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import useKanbanStore from "@/app/store/store";
import {useState} from "react";

export default function ColumnSheetContent({id, title, titleColor}: TColumn) {

  const [columnTitle, setColumnTitle] = useState<string>(title);

  const updateTitle = useKanbanStore(state => state.updateColumnTitle)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setColumnTitle(newTitle);
    updateTitle(id, newTitle);
  }

  return (
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="pt-8 flex gap-4 flex-col">
        <div className="text-sm text-(--ring)">
          <SheetTitle>
            <Input
              placeholder="Тема"
              maxLength={100}
              defaultValue={columnTitle}
              list="theme-suggestions"
              onBlur={handleTitleChange}
              className="hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl"
            />
          </SheetTitle>
        </div>
      </div>

      <Popover modal={true}>
        <PopoverTrigger className="mt-auto">
          <Button
            variant="outline"
            type="button"
            className="p-4 mt-auto ml-auto w-full"
          >
            Удалить колонку
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center gap-4 w-72">
          <p>Удалить колонку?</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
              }}
              type="button"
              className="w-30 p-4 mt-auto ml-auto"
            >
              Удалить
            </Button>
            <PopoverClose>
              <Button
                variant="outline"
                onClick={() => {
                }}
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
  )
}