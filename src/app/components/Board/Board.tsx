import { ColumnProps } from "../Column/Column"
import Column from "../Column/Column"

type BoardProps = {
  id: string;
  columns: string[];
}

export default function Board() {
  return (
    <li className="rounded-lg p-4 h-4 bg-yellow-100">
      <Column />
      board 1
    </li>
  )
}