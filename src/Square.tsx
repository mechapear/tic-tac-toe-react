import { MouseEventHandler } from 'react'

export type SquareValue = 'X' | 'O' | null
export type Squares = SquareValue[]

export type SquareProps = {
  value: SquareValue // X, O, null
  onSquareClick: MouseEventHandler<HTMLButtonElement>
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}
