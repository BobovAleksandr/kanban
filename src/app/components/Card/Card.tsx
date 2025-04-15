"use client";

import Image from "next/image";
import { TCard } from "@/app/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CardSheetContent } from "../CardSheetContent/CardSheetContent";
import { Badge } from "@/components/ui/badge";


export default function Card({
  id,
  image,
  theme,
  description,
  tags,
  onDelete,
}: TCard) {
  return (
    <Sheet>
      <SheetContent className="sm:max-w-120">
        <CardSheetContent
          id={id} 
          image={image}
          theme={theme}
          description={description}
          tags={tags}
        />
      </SheetContent>
      <SheetTrigger asChild>
        <li className="relative group flex grow flex-col gap-4 bg-white rounded-lg p-2 border-1 hover:cursor-pointer">
          {theme && <p className="text-sm text-blue-300">
            {theme}
          </p>}
          {image && (
            <div className="w-full relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={image}
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