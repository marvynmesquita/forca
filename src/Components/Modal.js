import React from 'react'
import { useState } from 'react'

export default function Modal({ isCorrect, turn, solution }) {
    const [meaning, setMeaning] = useState('')
    const dicio = require('dicio-br')();
    const showMeaning = async () => {
        const entry = await dicio(solution)
        setMeaning(entry)
        console.log(entry)
        return        
    }
    showMeaning();
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>Você acertou!</h1>
                <p>A palavra era <span className='solution'>{solution}</span></p>
                <p>Você descobriu em {turn} chances</p>
                <p>{meaning}</p>
            </div>
        )}
        {!isCorrect && ( 
            <div>
                <h1>Você não acertou</h1>
                <p>A palavra era <span className='solution'>{solution}</span></p>
                <p>{meaning}</p>
            </div>
        )}
        {solution === undefined && (
            <div>
                <h1>Aguarde...</h1>
                <p>Estamos consultando o dicionário</p>
                <i class="gg-loadbar-doc"></i>
            </div>
        )
        }
    </div>
  )
}
