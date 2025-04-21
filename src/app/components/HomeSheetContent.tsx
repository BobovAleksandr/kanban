import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import useKanbanStore from "../store/store";
import { Input } from "@/app/components/ui/input";
import { SheetTitle } from "@/app/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type SettingsFormInputs = {
  columnTitle: string
}

export default function HomeSheetContent() {
  const addColumn = useKanbanStore(state => state.addColumn);
  const columns = useKanbanStore(state => state.columns)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<SettingsFormInputs>();

  const onSubmit: SubmitHandler<SettingsFormInputs> = (data) => {
    if (data.columnTitle.trim() === '') {
      toast.error('Это поле не может быть пустым')
      return
    }

    addColumn({
      id: Date.now().toString(),
      title: data.columnTitle,
      titleColor: "#F0F8FF",
      cardIds: []
    });
    reset();
  };

  return (
    <div className="p-4 flex flex-col h-full justify-between gap-8">
      <VisuallyHidden asChild><SheetTitle /></VisuallyHidden>
      <form className="text-sm text-(--ring) flex flex-col pt-8" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="addColumn" className="mb-2 text-accent-foreground">
          Добавить колонку
        </Label>
        <div className="text-sm text-(--ring) flex gap-2">
          <Input
            id="addColumn"
            type="text"
            placeholder={Object.keys(columns).length === 6 ? "Максимум колонок" : "Название колонки"}
            minLength={1}
            maxLength={25}
            required
            autoComplete="off"
            disabled={Object.keys(columns).length === 6}
            className="text-accent-foreground hover:border-inherit transition-all duration-200 border-accent shadow-none md:text-xl mb-6"
            {...register("columnTitle")}
          />
          <Button variant="default" size="icon" type="submit" className="min-w-24">
            Добавить
          </Button>
        </div>
      </form>
    </div>
  )
}