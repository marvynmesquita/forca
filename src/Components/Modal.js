import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Modal({ isCorrect, turn, solution }) {
    const [meaning, setMeaning] = useState('')
    var entry;
    var XMLParser = require('react-xml-parser');
    var parse = require('html-react-parser')
    const showMeaning = async () => {
        await axios.get('https://api.dicionario-aberto.net/word/' + solution)
            .then(response => {
                if (response.data[0]) {
                    entry = response.data[0].xml
                    var xml = new XMLParser().parseFromString(entry);
                    entry = xml.getElementsByTagName('def')[0].value
                    setMeaning(`<p>definição:</br>${entry}</p>`)
                }
            })
        return
    }
    {showMeaning()}
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>Você acertou!</h1>
                <p>A palavra era <span className='solution'>{solution}</span></p>
                <p>Você descobriu em {turn} chances</p>
                {parse(meaning)}
            </div>
        )}
        {!isCorrect && ( 
            <div>
                <h1>Você não acertou</h1>
                <p>A palavra era <span className='solution'>{solution}</span></p>
                {parse(meaning)}
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
