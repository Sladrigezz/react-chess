import { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    setCurrentPlayer(whitePlayer);
    restart();
  }, []);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer)
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="черные фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="белые фигуры" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
