import React from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  cellClick: (cell: Cell) => void;
}

export default function CellComponent({
  cell,
  selected,
  cellClick,
}: CellProps) {
  return (
    <div
      onClick={() => cellClick(cell)}
      className={`cell ${cell.color} ${selected ? "selected" : ""} ${
        cell.available && cell.figure ? "green" : ""
      }`}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="figure" />}
    </div>
  );
}
