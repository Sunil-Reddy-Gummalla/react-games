import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import Confetti from 'react-confetti';


export default function Tenzies() {
    const [dices, setDices] = useState(() => generateAllNewDice());
  const gameWon = dices.every(die => die.isHeld) && dices.every(die => die.value === dices[0].value)
  const newGame = useRef(null);

  useEffect(() => {
    if (gameWon) {
      newGame.current.focus();
    }
  }, [gameWon])




  function generateAllNewDice() {
    return new Array(10).fill(0).map((value, index) => {
      return !value?.isHeld ? { value: Math.ceil(Math.random() * 6), isHeld: false, id: index } : value
    });
  }
  function rollDice() {
    setDices(
      oldDice => oldDice.map(
        die => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function hold(id) {
    setDices(
      oldDices => {
        return oldDices.map(
          die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
          }
        )
      }
    )
  }

  const diceElements = dices.map((v) => (<Die key={v.id} value={v.value} isHeld={v.isHeld} hold={() => hold(v.id)} />));
  return (
    <>
      <div className="tenzies">
        {gameWon && <Confetti />}
        <header>
          <h1>Tenzies</h1>
          <p>Roll untill all the dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </header>
        <div className="dices-container">
          {diceElements}
        </div>
        <div>

          {gameWon ? <button
            onClick={() => setDices(generateAllNewDice())}
            className="roll-dice"
            ref={newGame}
          > New Game
          </button> : <button onClick={rollDice} className="roll-dice">Roll</button>}
        </div>
      </div>
    </>
  )
}