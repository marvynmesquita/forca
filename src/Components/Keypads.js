import React, { useEffect, useState } from 'react'


let keys = {
    "letters": [
        {"key":"q"},
        {"key":"w"},
        {"key":"e"},
        {"key":"r"},
        {"key":"t"},
        {"key":"y"},
        {"key":"u"},
        {"key":"i"},
        {"key":"o"},
        {"key":"p"},
        {"key":"a"},
        {"key":"s"},
        {"key":"d"},
        {"key":"f"},
        {"key":"g"},
        {"key":"h"},
        {"key":"j"},
        {"key":"k"},
        {"key":"l"},
        {"key":"ç"},
        {"key":"z"},
        {"key":"x"},
        {"key":"c"},
        {"key":"v"},
        {"key":"b"},
        {"key":"n"},
        {"key":"m"},
        {"key":"Enter"},
        {"key":"Backspace"}
    ]
}


export default function Keypads({ usedKeys, handleKeyUp }) {
    const [letters, setLetters] = useState(null)
    const virtualKey = (e) => {
        console.log((e.currentTarget.textContent))
        const key= (e.currentTarget.textContent)
        handleKeyUp({key})
    }

    useEffect(() => {setLetters(keys.letters);})
  return (
    <div className='keypad'>
        {letters && letters.map((l) => {
            let color = usedKeys[l.key]
            return(
                <button className={color} key={l.key} onClick={(e) => virtualKey(e)}>{l.key}</button>
            )
        })}
    </div>
  )
}
