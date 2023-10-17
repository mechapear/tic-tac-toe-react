import { MouseEventHandler } from 'react'
import getBoardState, { BoardStatus } from '../domain/boardState.ts'
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
