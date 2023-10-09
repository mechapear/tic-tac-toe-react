import './App.css'
import { useState } from 'react'
import Board, { BoardProps } from './Board'
import { Squares } from './Square.tsx'

const INITIAL_HISTORY: Squares[] = [
  Array.from({ length: 9 }).fill(null) as Squares,
]

export default function Game() {
  // set 'X' to be first move by default
  const [xIsNext, setXIsNext] = useState(true)
  // Lifting state up
  // Array(9).fill(null) creates an array with nine elements
  // and sets each of them to null
  // Each entry in the array is X or O or null
  const [history, setHistory] = useState(INITIAL_HISTORY)
  // Render the squares by read the last squares array from the history
  const currentSquares = history[history.length - 1]

  // Convert to variable holding arrow function format
  // Add type to variable instead of adding type to parameters and the return value
  // to make sure that the type of parameters and the return value are the same as onPlay type
  const handlePlay: BoardProps['onPlay'] = (nextSquares) => {
    // flip the value of xIsNext for determine the next player
    setXIsNext(!xIsNext)
    // update history by appending the updated squares array as a new history entry
    setHistory([...history, nextSquares])
  }

  const handleRestartClick: BoardProps['onRestart'] = () => {
    setHistory(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          onRestart={handleRestartClick}
        />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}
