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

  const [winner, setWinner] = useState(null);

  const [currentGameState, setCurrentGameState] = useState([
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

  function calculateWinner() {
    // check all rows
    for (let row = 0; row <= 2; row++) {
      if (
        JSON.stringify(currentGameState[row]) ===
        JSON.stringify([turn, turn, turn])
      ) {
        setWinner(turn);
        return;
      }
    }
    // check all columns
    for (let col = 0; col <= 2; col++) {
      if (
        JSON.stringify(
          [currentGameState[0][col], currentGameState[1][col], currentGameState[2][col]]
        ) ===
        JSON.stringify(
          [turn, turn, turn]
        )
      ) {
        setWinner(turn);
        return;
      }
    }
    // check for diags
    if (
      JSON.stringify([currentGameState[0][0], currentGameState[1][1], currentGameState[2][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      setWinner(turn);
      return;
    }
    if (
      JSON.stringify([currentGameState[2][0], currentGameState[1][1], currentGameState[0][2]]) ===
      JSON.stringify([turn, turn, turn])
    ) {
      setWinner(turn);
      return;
    }

    return;
  }

  function playTurn(row, col, tur) {
    if (!winner) {
      const nextGameState = currentGameState.slice();
      if (currentGameState[row][col]) {
        return
      }
      nextGameState[row][col] = tur;
      setCurrentGameState(nextGameState);
      calculateWinner();
      incrementTurn();
      console.log(turn + ' ' + winner)
    }
  }

  return (
    <Board turn={turn} gameState={currentGameState} winner={winner} onPlay={playTurn} />
  );
}

function Board({ turn, gameState, winner, onPlay }) {
  function play(row, col, tur) {
    onPlay(row, col, tur)
  }

  return (
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
  );
}
