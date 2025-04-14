"use client";

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
import { TCard } from "@/app/types";

export default function Card({
  id,
  image,
  theme,
  description,
  tags,
  // deadline,
  onDelete,
}: TCard) {
  return (
    <li className="relative group flex flex-col gap-4 bg-white rounded-lg p-4 border-1 shadow-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <X />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full items-center flex gap-2" side="right">
          <p className="mr-2">Удалить задачу?</p>
          <Button onClick={() => onDelete(id)}>Удалить</Button>
          <Button variant="outline">
            <PopoverClose>Отмена</PopoverClose>
          </Button>
        </PopoverContent>
      </Popover>
      {image ? (
        <div className="w-full relative aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="task"
            fill
            className="object-cover object-center block"
          />
        </div>
      ) : null}
      {theme ? <p className="text-sm text-blue-300 text">{theme}</p> : null}
      <p className="text-base">{description}</p>
      {tags && tags.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge variant="secondary" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </li>
  );
}
