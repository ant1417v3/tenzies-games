
import Die from './Die'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [tenzies, setTenzies] = React.useState(false)
  const [dices, setDices] = React.useState(allNewDice())

  React.useEffect(()=> {
    const allHeld =dices.every(die => die.isHeld)
    const fistValue = dices[0].value
    const allSameValue = dices.every(die =>die.value === fistValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("You won!")
    }

  },[dices])



  function holdDice(id){
    setDices(oldDice => oldDice.map(dice =>{
      return dice.id === id ? 
      {...dice, isHeld: !dice.isHeld} : dice
    }) )
  }
   
  function allNewDice(){
    const newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.floor(Math.random() *6), 
        isHeld: false,
        id: nanoid()
      }) 
    }
    return newArray
    
  }
  const diceElement = dices.map(dice  => 
  <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={()=>holdDice(dice.id)}></Die>)

  function rollDice(){
    if (!tenzies){
      setDices(oldDice => oldDice.map(dice =>{
        return dice.isHeld === true ?
        dice : {...dice, value: Math.floor(Math.random() *6) }
      }))
    }
    else{
      setTenzies(false)
      setDices(allNewDice())
    }

  }

  return (
    <main>
      {tenzies && <Confetti/> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>
      
      <div className='dice-container'>
        {diceElement}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>

  )
}

export default App
