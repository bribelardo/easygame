import { useState, useEffect, useRef } from 'react'
import { Trophy } from 'lucide-react'

const sentences = [
  'The quick brown fox jumps over the lazy dog',
  'Programming is the art of telling another human what one wants the computer to do',
  'Code is like humor when you have to explain it its bad',
  'First solve the problem then write the code',
  'Any fool can write code that a computer can understand',
  'Experience is the name everyone gives to their mistakes',
  'In order to be irreplaceable one must always be different',
  'Java is to JavaScript what car is to carpet',
]

function TypingTest({ addPoints }) {
  const [targetText, setTargetText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    newTest()
  }, [])

  const newTest = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    setTargetText(randomSentence)
    setUserInput('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
    setHasStarted(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleInputChange = (e) => {
    const value = e.target.value

    if (!hasStarted) {
      setHasStarted(true)
      setStartTime(Date.now())
    }

    setUserInput(value)

    // Calculate accuracy
    let correct = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) correct++
    }
    const acc = value.length > 0 ? (correct / value.length) * 100 : 100
    setAccuracy(Math.round(acc))

    // Check completion
    if (value === targetText) {
      const endTime = Date.now()
      const timeTaken = (endTime - startTime) / 1000 / 60 // minutes
      const words = targetText.split(' ').length
      const calculatedWpm = Math.round(words / timeTaken)
      setWpm(calculatedWpm)
      setIsComplete(true)
      
      const points = Math.floor(calculatedWpm * (accuracy / 100))
      addPoints(points)
    }
  }

  const getCharClass = (index) => {
    if (index >= userInput.length) return 'text-gray-400'
    if (userInput[index] === targetText[index]) return 'text-green-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-3xl">
      <div className="border-4 border-black p-6">
        <h3 className="font-['Khand'] text-4xl font-bold mb-4">TYPING SPEED TEST</h3>

        <div className="flex gap-4 mb-4">
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">WPM: {wpm}</span>
          </div>
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">Accuracy: {accuracy}%</span>
          </div>
        </div>

        {isComplete && (
          <div className="bg-blue-600 text-white border-2 border-black p-4 mb-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Trophy className="w-6 h-6" />
              COMPLETED! WPM: {wpm} | Accuracy: {accuracy}%
            </div>
          </div>
        )}

        {/* Target text */}
        <div className="border-4 border-black p-6 mb-4 bg-gray-50 text-2xl font-mono leading-relaxed">
          {targetText.split('').map((char, idx) => (
            <span key={idx} className={getCharClass(idx)}>
              {char}
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isComplete}
          className="w-full border-4 border-black p-4 text-xl font-mono mb-4 focus:outline-none focus:ring-4 focus:ring-blue-600"
          placeholder="Start typing here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        <button
          onClick={newTest}
          className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:bg-blue-700"
        >
          NEW TEST
        </button>
      </div>
    </div>
  )
}

export default TypingTest