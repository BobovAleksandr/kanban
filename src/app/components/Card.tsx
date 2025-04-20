"use client";

import Image from "next/image";
import { TCard } from "@/app/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CardSheetContent } from "./CardSheetContent";
import { Badge } from "@/components/ui/badge";
import { useDraggable } from "@dnd-kit/core";

type CardProps = TCard & {
  columnId: string;
  index: number;
};

export default function Card({
                               id,
                               imageUrl,
                               theme,
                               description,
                               tags,
                               columnId,
                               index,
                             }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      columnId,
      index,
    },
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: isDragging ? 1000 : "auto",
      opacity: isDragging ? 0.8 : 1,
      boxShadow: isDragging ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
    }
    : undefined;

  return (
    <Sheet>
      <SheetContent className="sm:max-w-100">
        <CardSheetContent
          id={id}
          imageUrl={imageUrl}
          theme={theme}
          description={description}
          tags={tags}
        />
      </SheetContent>
      <SheetTrigger asChild>
        <li
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          className="relative group flex flex-col gap-4 bg-white rounded-lg p-2 border-1 hover:cursor-pointer"
        >
          {theme && (
            <p className="text-sm text-(--ring) overflow-hidden text-ellipsis text-nowrap">
              {theme}
            </p>
          )}
          {imageUrl && (
            <div className="w-full relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="task"
                fill
                className="object-cover object-center block"
              />
            </div>
          )}
          <p className="text-base">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <Badge variant="secondary" key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </li>
      </SheetTrigger>
    </Sheet>
  );
}