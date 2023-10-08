import { MouseEventHandler } from 'react'

type SquareProps = {
  value: string | null // X, O, null
  onSquareClick: MouseEventHandler<HTMLButtonElement>
}

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}
