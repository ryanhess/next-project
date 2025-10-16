import { useState } from 'react';

const symbol = Object.freeze({
  X: 'X',
  O: 'O',
});

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function GameStatusBox({ winner, turn }) {
  if (winner) {
    return <div>Winner: {winner}</div>;
  } else {
    return <div>Current Player: {turn}</div>;
  }
}

function GameHistoryDisplay({ history, onJump }) {
  let movesList = history.map((boardState, index) => {
    let description = '';
    if (index == 0) {
      description = 'New Game'
    } else {
      description = 'Move ' + index;
    }
    return (
      <li key={index}>
        <button onClick={() => onJump(index)}>{description}</button>
      </li>
    );
  });

  return (
    <ol className="history">
      {movesList}
    </ol>
  );
}

export default function Game() {
  const [turn, setTurn] = useState(symbol.X);

  const [winner, setWinner] = useState(null);

  const [currentBoardState, setCurrentBoardState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const [gameHistory, setGameHistory] = useState([
    {
      turn: turn,
      winner: winner,
      boardState: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    }
  ]);

  function jumpTo(move) {
    setTurn(gameHistory[move].turn)
    setWinner(gameHistory[move].winner)
    setCurrentBoardState(gameHistory[move].boardState)
    setGameHistory(gameHistory.slice(0, move + 1))
  }

  function nextTurn() {
    if (turn === symbol.X) {
      return symbol.O;
    } else {
      return symbol.X;
    }
  }

  // returns the winner given the current board state
  // returns null if no winner.
  function calculateWinner() {
    // check all rows
    for (let row = 0; row <= 2; row++) {
      if (
        JSON.stringify(currentBoardState[row]) ===
        JSON.stringify([turn, turn, turn])
      ) {
        return turn;
      }
    }
    // check all columns
    for (let col = 0; col <= 2; col++) {
      if (
        JSON.stringify(
          [currentBoardState[0][col], currentBoardState[1][col], currentBoardState[2][col]]
        ) ===
        JSON.stringify(
          [turn, turn, turn]
        )
      ) {
        return turn;
      }
    }
    // check for diags
    if (
      JSON.stringify([currentBoardState[0][0], currentBoardState[1][1], currentBoardState[2][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      return turn;
    }
    if (
      JSON.stringify([currentBoardState[2][0], currentBoardState[1][1], currentBoardState[0][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      return turn;
    }

    return null;
  }

  function playTurn(row, col, tur) {
    if (!winner) {
      const nextBoardState = currentBoardState.slice();
      const newGameHistory = structuredClone(gameHistory);
      if (currentBoardState[row][col]) {
        return;
      }
      nextBoardState[row][col] = tur;
      setCurrentBoardState(nextBoardState);
      setWinner(calculateWinner());
      setTurn(nextTurn());
      console.log
      newGameHistory.push(
        {
          turn: nextTurn(),
          winner: calculateWinner(),
          boardState: nextBoardState
        }
      );
      setGameHistory(newGameHistory);
      console.log(newGameHistory)
    }
  }

  return (
    <>
      <GameStatusBox winner={winner} turn={turn} />
      <Board turn={turn} gameState={currentBoardState} winner={winner} onPlay={playTurn} />
      <GameHistoryDisplay history={gameHistory} onJump={jumpTo} />
    </>
  );
}

function Board({ turn, gameState, onPlay }) {
  return (
    <div className="board">
      <div className="board-row">
        <Square value={gameState[0][0]} onSquareClick={() => onPlay(0, 0, turn)} />
        <Square value={gameState[0][1]} onSquareClick={() => onPlay(0, 1, turn)} />
        <Square value={gameState[0][2]} onSquareClick={() => onPlay(0, 2, turn)} />
      </div>
      <div className="board-row">
        <Square value={gameState[1][0]} onSquareClick={() => onPlay(1, 0, turn)} />
        <Square value={gameState[1][1]} onSquareClick={() => onPlay(1, 1, turn)} />
        <Square value={gameState[1][2]} onSquareClick={() => onPlay(1, 2, turn)} />
      </div>
      <div className="board-row">
        <Square value={gameState[2][0]} onSquareClick={() => onPlay(2, 0, turn)} />
        <Square value={gameState[2][1]} onSquareClick={() => onPlay(2, 1, turn)} />
        <Square value={gameState[2][2]} onSquareClick={() => onPlay(2, 2, turn)} />
      </div>
    </div>
  );
}
