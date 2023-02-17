import React, { useEffect, useState } from 'react'

let keys = {
    "letters": [
        {"key":"a"},
        {"key":"b"},
        {"key":"c"},
        {"key":"d"},
        {"key":"e"},
        {"key":"f"},
        {"key":"g"},
        {"key":"h"},
        {"key":"i"},
        {"key":"j"},
        {"key":"k"},
        {"key":"l"},
        {"key":"m"},
        {"key":"n"},
        {"key":"o"},
        {"key":"p"},
        {"key":"q"},
        {"key":"r"},
        {"key":"s"},
        {"key":"t"},
        {"key":"u"},
        {"key":"v"},
        {"key":"w"},
        {"key":"x"},
        {"key":"y"},
        {"key":"z"}
    ]
}

export default function Keypads({ usedKeys }) {
    const [letters, setLetters] = useState(null)

    useEffect(() => {setLetters(keys.letters);})
  return (
    <div className='keypad'>
        {letters && letters.map((l) => {
            let color = usedKeys[l.key]
            return(
                <button className={color} key={l.key}>{l.key}</button>
            )
        })}
    </div>
  )
}
