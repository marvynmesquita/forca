import React from 'react'

export default function Row ({solution, guess, currentGuess}) {
    var elements = []
    if (guess) {
        {guess.map((l)=> {
            elements.push(<div className={l.color}>{l.key}</div>)
        })}
        return (
            <div className='row past'>
                {elements}
            </div>
          )
    } else if(currentGuess){
        let letters = currentGuess.split('')

        letters.map((letter)=> {
            elements.push(<div className='filled'>{letter}</div>)
        })
        {[...Array(solution.length - letters.length)].map((_,i)=>{
            elements.push(<div ></div>)
        })}
        return (
            <div className='row current'>
                {elements}
            </div>
        )

    } else{
        for (var i = elements.length; i < solution.length; i = elements.length) {
            elements.push(<div></div>)
        }
        return (
            <div className='row'>
                {elements}
            </div>
          )
    }
}
