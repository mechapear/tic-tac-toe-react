import { MouseEventHandler } from 'react'

export type SquareValue = 'X' | 'O' | null
export type Squares = SquareValue[]

export type SquareProps = {
  value: SquareValue // X, O, null
  onSquareClick: MouseEventHandler<HTMLButtonElement>
  winSquare: string
}

export default function Square({
  value,
  onSquareClick,
  winSquare,
}: SquareProps) {
  return (
    <button className={`square ${winSquare}`} onClick={onSquareClick}>
      {value}
    </button>
  )
}
