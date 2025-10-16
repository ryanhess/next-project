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
  return (
    <div>
      Current Player: {turn}
    </div>
  )
}

export default function Game() {
  const [turn, setTurn] = useState(symbol.X);

  const [winner, setGameOver] = useState(null);

  const [gameState, setGameState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  function incrementTurn() {
    if (turn === symbol.X) {
      setTurn(symbol.O);
    } else {
      setTurn(symbol.X);
    }
  }

  function play(row, col, sym) {
    if (!winner) {
      const nextGameState = gameState.slice();
      if (gameState[row][col]) {
        return
      }
      nextGameState[row][col] = sym;
      setGameState(nextGameState);
      calculateWinner();
      incrementTurn();
      console.log(turn + ' ' + winner)
    }
  }

  // calculates if a winner has emerged for the current turn.
  function calculateWinner() {
    // check all rows
    for (let row = 0; row <= 2; row++) {
      if (
        JSON.stringify(gameState[row]) ===
        JSON.stringify([turn, turn, turn])
      ) {
        setGameOver(turn);
        return;
      }
    }
    // check all columns
    for (let col = 0; col <= 2; col++) {
      if (
        JSON.stringify(
          [gameState[0][col], gameState[1][col], gameState[2][col]]
        ) ===
        JSON.stringify(
          [turn, turn, turn]
        )
      ) {
        setGameOver(turn);
        return;
      }
    }
    // check for diags
    if (
      JSON.stringify([gameState[0][0], gameState[1][1], gameState[2][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      setGameOver(turn);
      return;
    }
    if (
      JSON.stringify([gameState[2][0], gameState[1][1], gameState[0][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      setGameOver(turn);
      return;
    }

    return;
  }

  return (
    <>
      <div className="board">
        <div className="board-row">
          <Square value={gameState[0][0]} onSquareClick={() => play(0, 0, turn)} />
          <Square value={gameState[0][1]} onSquareClick={() => play(0, 1, turn)} />
          <Square value={gameState[0][2]} onSquareClick={() => play(0, 2, turn)} />
        </div>
        <div className="board-row">
          <Square value={gameState[1][0]} onSquareClick={() => play(1, 0, turn)} />
          <Square value={gameState[1][1]} onSquareClick={() => play(1, 1, turn)} />
          <Square value={gameState[1][2]} onSquareClick={() => play(1, 2, turn)} />
        </div>
        <div className="board-row">
          <Square value={gameState[2][0]} onSquareClick={() => play(2, 0, turn)} />
          <Square value={gameState[2][1]} onSquareClick={() => play(2, 1, turn)} />
          <Square value={gameState[2][2]} onSquareClick={() => play(2, 2, turn)} />
        </div>
      </div>
      <GameStatusBox winner={winner} turn={turn} />
    </>
  );
}
