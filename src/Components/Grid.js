import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn, solution }) {
  return (
    <div>
        {guesses.map((g, i)=>{
            if(turn === i){
                return <Row key={i} solution={solution} currentGuess={currentGuess}/>
            }
            return <Row key={i} solution={solution} guess={g}/>
        })}
    </div>
  )
}
