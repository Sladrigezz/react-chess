import React, { Fragment, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
}

export default function BoardComponent({
  board,
  currentPlayer,
  swapPlayer,
  setBoard,
}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function cellClick(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      swapPlayer();
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  function updateBoard() {
    const newBoard = board.getCopyOfBoard();
    setBoard(newBoard);
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cellClick={cellClick}
                key={cell.id}
                cell={cell}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
