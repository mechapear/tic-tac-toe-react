import { MouseEventHandler } from 'react'
import Button from './Button.tsx'
import Square, { Squares, SquareValue } from './Square.tsx'

export type BoardProps = {
  xIsNext: boolean
  squares: Squares
  onPlay: (nextSquares: Squares) => void
  onRestart: MouseEventHandler<HTMLButtonElement>
}

export default function Board({
  xIsNext,
  squares,
  onPlay,
  onRestart,
}: BoardProps) {
  function handleSquareClick(i: number) {
    // Check if this square has already filled or this game has already over
    if (squares[i] || calculateWinner(squares)) return

    // Create a copy of the squares array
    // Avoiding direct data mutation and keep previous versions of the data intact, and reuse them later
    const nextSquares = squares.slice()
    // Update the nextSquares array
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    // pass the updated squares array to onPlay
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = winner + ' is the winner!'
  } else if (!squares.includes(null)) {
    status = 'Draw!'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <h1 className="status">{status}</h1>
      <div className="board-wrapper">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => handleSquareClick(0)}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleSquareClick(1)}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleSquareClick(2)}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => handleSquareClick(3)}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleSquareClick(4)}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleSquareClick(5)}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => handleSquareClick(6)}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleSquareClick(7)}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleSquareClick(8)}
          />
        </div>
      </div>
      <Button onRestartClick={onRestart} />
    </>
  )
}

function calculateWinner(squares: Squares): SquareValue {
  // All posibility to win
  const lines = [
    [0, 1, 2], // horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] // winner
    }
  }
  return null
}
