import { useEffect, useState } from 'react';
import axios from 'axios';
import Wordle from './Components/Wordle';
import raw from '../src/palavras.txt'; 
import './App.css';

function App() {
  const [palavra, setPalavra] = useState([])
  const controller = new AbortController();
  const fetchWord = async () => {
    var palavraAtual;
    await axios.get(raw, {signal: controller.signal}) 
        .then((response) => {
          const palavras = Array.from(response.data.split('\n'));
          const palavraIndex = Math.floor(Math.random() * palavras.length)
          palavraAtual = palavras[palavraIndex];
        })
        console.log('Procurando palavra');
        if (palavraAtual.length <= 5 && palavraAtual.match(/^[A-z]+$/) && palavra.length === 0) {
          controller.abort()
          return setPalavra(palavraAtual)
        } else if (palavra.length === 0) {
          return fetchWord();
        }
  }
useEffect(()=>{
  if(palavra.length < 5){
    fetchWord();
  }
})
  if(palavra.length !== 0){
    controller.abort()
    return (
      <div>
        <h1>Forca</h1>
        {palavra && <Wordle solution={palavra} />}
      </div>
    );
  }
  else {
    while(palavra.length === 0) {
      return (
        <div className='modal'>
          <h1>Aguarde...</h1>
          <p>Estamos consultando o dicionário</p>
        </div>
      );
    }
  }
}

export default App;
