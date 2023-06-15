
import Die from './Die'
import React from 'react'


function App() {

  const [dices, setDices] = React.useState(allNewDice())
   
  function allNewDice(){
    const newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() *6))
      
    }
    return newArray
    
  }
  const diceElement = dices.map(dice  => <Die value={dice}></Die>)

  function rollDice(){
    setDices(allNewDice())
  }

  return (
    <main>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-dice' onClick={rollDice}>Roll</button>
    </main>

  )
}

export default App
