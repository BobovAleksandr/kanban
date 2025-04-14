'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
 } from "@/components/ui/popover";
import Image from "next/image";

export type CardProps = {
  id: string;
  theme?: string;
  image?: string;
  description: string;
  tags?: string[];
  deadline?: string;
  onDelete: (id: string) => void;
}

export default function Card({ id, image, theme, description, tags, deadline, onDelete }: CardProps) {

  return (
    <li className="relative group flex flex-col gap-4 bg-white rounded-lg p-4 min-w-[240px] w-full max-w-[360px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <X />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full items-center flex gap-2" side="right">
          <p className="mr-2">
            Удалить задачу?
          </p>
          <Button onClick={() => onDelete(id)}>Удалить</Button>
          <Button variant="outline">
            <PopoverClose>Отмена</PopoverClose>
          </Button>
        </PopoverContent>
      </Popover>
      <div className="w-full relative aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={'/images/image.jpg'}
          alt="task"
          fill
          className="object-cover object-center block"
          />
      </div>
          {theme ?
            <p className="text-sm text-blue-300 text">
              {theme}
            </p>
            : null}
      <p className="text-base">
        текст задачи какой-то длинный хуй пойми зачем такой длинный
      </p>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">Баг</Badge>
        <Badge variant="secondary">Фича</Badge>
        <Badge variant="secondary">Срочно</Badge>
        <Badge variant="secondary">Что-то сделать</Badge>
      </div>
    </li>
  )
}