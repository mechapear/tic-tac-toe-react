import { MouseEventHandler } from 'react'
import { BoardState } from './Board.tsx'

export type SquareValue = 'X' | 'O' | undefined
export type Squares = SquareValue[]

export type SquareProps = {
  value: SquareValue // X, O, null
  onSquareClick: MouseEventHandler<HTMLButtonElement>
  squareStatus: BoardState['status']
  isWinSquare?: boolean
}

export default function Square({
  value,
  onSquareClick,
  squareStatus,
  isWinSquare,
}: SquareProps) {
  const gameEnd = squareStatus !== 'PLAYING'
  const extraClassName =
    squareStatus === 'WIN' && isWinSquare ? 'win-square' : 'lose-square'

  return (
    <button
      className={gameEnd ? 'square ' + extraClassName : 'square'}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}
