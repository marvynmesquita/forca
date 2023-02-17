import React, { useEffect, useState } from 'react'
import useWordle from '../Hooks/useWordle'
import Grid from '../Components/Grid';
import Keypads from './Keypads';
import Modal from './Modal';

export default function Wordle({ solution }) {
    const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp } = useWordle(solution)
    const [ showModal, setShowModal ] = useState(false)

    useEffect(()=> {
        window.addEventListener('keyup', handleKeyUp)

        if (isCorrect) {
            setTimeout(()=> setShowModal(true),2000)
            window.removeEventListener('keyup', handleKeyUp)
        }
        if (turn > solution.length) {
            setTimeout(()=> setShowModal(true),2000)
            window.removeEventListener('keyup', handleKeyUp)
        }

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp, isCorrect, turn, solution])

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} solution={solution}/>
            <Keypads usedKeys={usedKeys} handleKeyUp={handleKeyUp}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
        </div>
        
    )
}
