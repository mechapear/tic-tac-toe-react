import './App.css'
import { useState } from 'react'
import Board, { BoardProps } from './Board'
import { Squares } from './Square.tsx'

const INITIAL_HISTORY: Squares[] = [
  Array.from({ length: 9 }).fill(null) as Squares,
]

export default function Game() {
  // Lifting state up
  // Array(9).fill(null) creates an array with nine elements
  // and sets each of them to null
  // Each entry in the array is X or O or null
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [currentMove, setCurrentMove] = useState(0)

  // set 'X' to be first move by default
  // xIsNext === true when currentMove is even
  // xIsNext === false when currentMove is odd
  let xIsNext = currentMove % 2 === 0
  // Render the squares
  const currentSquares = history[currentMove]

  // Convert to variable holding arrow function format
  // Add type to variable instead of adding type to parameters and the return value
  // to make sure that the type of parameters and the return value are the same as onPlay type
  const handlePlay: BoardProps['onPlay'] = (nextSquares) => {
    // Update new move into history after user go back in time
    // update history by appending the updated squares array as a new history entry
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(newHistory)
    // Update currentMove
    setCurrentMove(newHistory.length - 1)
  }

  const handleRestartClick: BoardProps['onRestart'] = () => {
    setHistory(INITIAL_HISTORY)
    setCurrentMove(0)
    xIsNext = true
  }

  // use map to transform history of moves into React elements representing buttons
  // _ in front of variable name to indicate that we don't use it
  const move = history.map((_squares, move: number) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
      return (
        // Useing move as a key
        // Moves will never be re-ordered, deleted, or inserted, so it’s safe to use the move index as a key
        <li key={move} className="jump-button-item">
          <button className="jump-button" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      )
    }
  })

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
    // set xIsNext to true if the number that you’re changing currentMove to is even.
    xIsNext = nextMove % 2 === 0
  }

  return (
    <div>
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        onRestart={handleRestartClick}
      />
      <div className="game-info">
        <ol className="jump-button-lists">{move}</ol>
      </div>
    </div>
  )
}
