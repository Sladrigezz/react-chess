import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const isAbleToMoveVertical =
      target.y === this.cell.y + 1 || target.y === this.cell.y - 1;
    const isAbleToMoveHorizontal =
      target.x === this.cell.x + 1 || target.x === this.cell.x - 1;
    if (this.cell.isEmptyVertical(target)) {
      if (
        isAbleToMoveVertical &&
        target.x === this.cell.x &&
        (this.cell.board.getCell(target.x, target.y).isEmpty() ||
          this.cell.isEnemy(target))
      ) {
        return true;
      }
    }

    if (this.cell.isEmptyHorizontal(target)) {
      if (
        target.y === this.cell.y &&
        isAbleToMoveHorizontal &&
        (this.cell.board.getCell(target.x, target.y).isEmpty() ||
          this.cell.isEnemy(target))
      ) {
        return true;
      }
    }
    if (this.cell.isEmptyDiagonal(target)) {
      if (
        isAbleToMoveVertical &&
        isAbleToMoveHorizontal &&
        (this.cell.board.getCell(target.x, target.y).isEmpty() ||
          this.cell.isEnemy(target))
      ) {
        return true;
      }
    }
    return false;
  }
}
