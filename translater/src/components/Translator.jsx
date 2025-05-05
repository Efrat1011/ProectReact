// import React, { useState } from 'react'
// import axios from 'axios'


// const apiKey = import.meta.env.VITE_GEMINI_API_KEY

// export default function Translator() {
    
//     let [userInput,setUserInput] = useState('')
//     let [loading,setLoading] = useState(false)
//     let [error,setError] = useState('')
//     let [answerToggle,setAnswerToggle] = useState('')

//     const handleSubmit = async (e) =>{
//         e.preventDefault()
//         try {
//             setLoading(true)
//             setAnswerToggle('')
//             let response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
//                 {
//                     contents: [{parts:[{text:userInput}]}]
//                 },
//                 {
//                     headers: {'Content-Type': 'application/json'}
//                 }
            
//             )
//             let answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//             if(answer){
//                 setLoading(false)
//                 setAnswerToggle(answer)
//                 setUserInput('')
//             }
    
          
            
//         } catch (err) {
//             setLoading(false)
//             setError(err.message);
            
            
//         }
//     }
//   return (
//     <div>
//       <h1>Gemini Chat</h1>
//       <form onSubmit={handleSubmit}>
//         <input 
//             type="text"
//             placeholder='Привет Gemini! Как дела?' 
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}/>
//         <button type='submit'>Search...</button>
//       </form>
//       {loading && <p style={{ color: 'green' }}>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {answerToggle && 
//         <div>
//            <h1> {answerToggle}</h1>
//         </div>
//     }
//     </div>
//   )
// }



import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

export default function Translator() {
  const [lang, setLang] = useState('')
  const [text, setText] = useState('English')
  const [translations, setTranslations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('translations')
    if (saved) {
      setTranslations(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('translations', JSON.stringify(translations))
  }, [translations])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!lang.trim()) return
    setLoading(true)
    setError('')

    try {
      const prompt = `Только переведи слово "${lang}" на ${text}.`
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (answer) {
        const newTranslation = { input: lang, output: answer }
        setTranslations([newTranslation, ...translations])
        setLang('')
      }
    } catch (err) {
      setError('Ошибка перевода')
    } finally {
      setLoading(false)
    }
  }

  
  const handleClear = () => {
    setTranslations([])
    localStorage.removeItem('translations')
  }

  return (
    <div className="container">
      <h1>Translator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          placeholder="Введите слово..."
        />
        <select
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
          <option>English</option>
          <option>Russian</option>
          <option>Kazakh</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Italian</option>
        </select>
        <button type="submit">Translate</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="container1">
        {translations.map((item, index) => (
          <p key={index} className="translation-item">
            {item.input} - {item.output}
          </p>
        ))}
        {translations.length > 0 && (
          <button className='button' onClick={handleClear}>Clear</button>
        )}
      </div>
    </div>
  )
}


