import { MouseEventHandler } from 'react'

export type ButtonProps = {
  onRestartClick: MouseEventHandler<HTMLButtonElement>
}
export default function Button({ onRestartClick }: ButtonProps) {
  return (
    <div className="button-wrapper">
      <button className="restart-button" onClick={onRestartClick}>
        Restart
      </button>
    </div>
  )
}
