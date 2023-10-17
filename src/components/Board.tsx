import { MouseEventHandler } from 'react'
import { cloneArr } from '../utils/cloneArr.ts'
import Button from './Button.tsx'
import Square, { Squares, SquareValue } from './Square.tsx'

type GetStatusMessageParams = {
  status: BoardStatus
  winner?: SquareValue
  nextPlayer?: string
}

function getStatusMessage({
  status,
  winner,
  nextPlayer,
}: GetStatusMessageParams) {
  switch (status) {
    case 'WIN':
      return `${winner} is the winner!`
    case 'DRAW':
      return 'Draw!'
    default:
      return `Next player: ${nextPlayer}`
  }
}

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
  // Status Message
  const { status, winner, winSquares } = getBoardState(squares)

  // calculate next player
  const nextPlayer = xIsNext ? 'X' : 'O'

  const statusMessage = getStatusMessage({
    status,
    winner,
    nextPlayer,
  })

  function handleSquareClick(index: number) {
    // Check if this square has already filled or this game has already over
    if (squares[index] || status !== 'PLAYING') return

    // Create a copy of the squares array to avoiding direct data mutation
    // and keep the original reference intact so that we can reuse it later.
    const nextSquares = cloneArr(squares)

    // Update the nextSquares array
    nextSquares[index] = nextPlayer

    // pass the updated squares array to onPlay
    onPlay(nextSquares)
  }

  return (
    <>
      <h1 className="status">{statusMessage}</h1>
      <div className="board-wrapper">
        {/*render 9 squares*/}
        {squares.map((_square, index) => {
          return (
            <Square
              // Squares will never be re-ordered, deleted, or inserted,
              // so it’s safe to use the squares' index as a key
              key={index}
              value={squares[index]}
              onSquareClick={() => handleSquareClick(index)}
              squareStatus={status}
              // check if this square is a win square
              isWinSquare={winSquares?.includes(index)}
            />
          )
        })}
      </div>
      <div>
        <Button onRestartClick={onRestart} />
      </div>
    </>
  )
}

// TODO: extract to domain/boardState.ts
// All posibility to win
const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2], // horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal
  [2, 4, 6],
]

export type BoardStatus = 'PLAYING' | 'DRAW' | 'WIN'

export type BoardState = {
  winner: SquareValue
  winSquares: (typeof WINNING_COMBINATIONS)[number] | undefined
  status: BoardStatus
}

function getBoardState(squares: Squares): BoardState {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const winCombination = WINNING_COMBINATIONS[i]
    const [a, b, c] = winCombination
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a], // winner
        winSquares: winCombination,
        status: 'WIN',
      }
    }
  }

  const isGameEnd = !squares.includes(undefined)

  return {
    winner: undefined, // winner
    winSquares: undefined,
    status: isGameEnd ? 'DRAW' : 'PLAYING',
  }
}
