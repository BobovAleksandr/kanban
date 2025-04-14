import Card from "../Card/Card";

export type ColumnProps = {
  id: string;
  cards: string[];
}

export default function Column() {
  return (
    <li className="bg-white rounded-lg p-4 h-4">
      <Card />
      column 1
    </li>
  )
}