// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({
  winner,
  currentGame,
  currentStep,
  nextValue,
  setCurrentGame,
  setCurrentStep,
}) {
  function selectSquare(square) {
    const activeStep = [...currentGame[currentStep]]
    if (winner || activeStep[square] !== null) {
      return
    }

    activeStep[square] = nextValue
    const squaresCopy = [...currentGame.slice(0, currentStep + 1), activeStep]
    setCurrentGame(squaresCopy)
    setCurrentStep(currentStep + 1)
  }

  function restart() {
    setCurrentGame([Array(9).fill(null)])
    setCurrentStep(0)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currentGame[currentStep][i]}
      </button>
    )
  }

  return (
    <>
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
    </>
  )
}

function Game() {
  const [currentGame, setCurrentGame] = useLocalStorageState('tttGame', [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = React.useState(0)

  const nextValue = calculateNextValue(currentGame[currentStep])
  const winner = calculateWinner(currentGame[currentStep])
  const status = calculateStatus(winner, currentGame[currentStep], nextValue)

  const steps = currentGame.map((_, index) => {
    const text = index === 0 ? 'Go to game start' : `Go to step #${index}`
    const statusText = index === currentStep ? ' (Current)' : ''
    return (
      <li key={`move_${index}`}>
        <button onClick={() => setCurrentStep(index)}>
          {`${text}${statusText}`}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          winner={winner}
          currentGame={currentGame}
          currentStep={currentStep}
          nextValue={nextValue}
          setCurrentGame={setCurrentGame}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div>
        <div className="status">{status}</div>
        <ol>{steps}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  if (winner) {
    return `Winner: ${winner}`
  }
  return squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
