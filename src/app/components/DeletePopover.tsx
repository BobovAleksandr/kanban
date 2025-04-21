import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";

type DeletePopoverProps = {
  id: string;
  buttonTitle: string;
  onDelete: (id: string) => void;
}

export default function DeletePopover({ id, buttonTitle, onDelete }: DeletePopoverProps) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild className="mt-auto">
        <Button
          variant="outline"
          type="button"
          className="p-4 mt-auto ml-auto w-full"
        >
          {buttonTitle}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-4 w-72">
        <p>{buttonTitle}?</p>
        <div className="flex gap-4">
          <Button
            onClick={() => onDelete(id)}
            type="button"
            className="w-30 p-4 mt-auto ml-auto"
          >
            Удалить
          </Button>
          <PopoverClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-30 p-4 mt-auto ml-auto"
            >
              Отмена
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}