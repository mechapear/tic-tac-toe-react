import { Squares, SquareValue } from '../components/Square.tsx'

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

export default function getBoardState(squares: Squares): BoardState {
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
