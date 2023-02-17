import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(solution.length + 1)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    const formatGuess = () =>{
        let solutionArray = [...solution];
        let formatedGuess = [...currentGuess].map((l)=>{
            return {key: l, color: 'grey'}
        });
        formatedGuess.forEach((l,i)=>{
            if (solutionArray[i] === l.key){
                formatedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })
        formatedGuess.forEach((l,i)=>{
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formatedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formatedGuess
    }

    const addNewGuess = (formatedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses)=>{
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formatedGuess
            return newGuesses
        })
        setHistory((prevHistory)=>{
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn)=>{
            return prevTurn + 1;
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            formatedGuess.forEach((l) => {
                const currentColor = newKeys[l.key];
                if (l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                } else if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return
                } else if (l.color === 'grey' && currentColor !== 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')       
    }

    const handleKeyUp = ({ key }) => {
        const keypad = document.querySelectorAll('button')
        if (key === 'Enter'){
            if(turn > solution.length){
                console.log('Você usou todas as suas tentativas')
                return
            }
            if(history.includes(currentGuess)){
                console.log('Você já tentou essa palavra')
                return
            }
            if(currentGuess.length !== solution.length){
                console.log(`A palavra deve conter ${solution.length} letras`)
                return
            }
            const formated = formatGuess()
            addNewGuess(formated)
        }
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }
        if(/^[A-zÁ-ü]+$/.test(key)){
            if(currentGuess.length < solution.length){
                setCurrentGuess((prev)=> {
                    return prev + key
                })
            }
        }
        keypad.forEach(keyChild => {
            if(key === (keyChild.textContent)){
                keyChild.classList.add('bounce-button')
            }
        })
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp}
}
export default useWordle