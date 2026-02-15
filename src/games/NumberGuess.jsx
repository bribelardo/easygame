import { useState } from 'react'
import { Trophy, ArrowUp, ArrowDown, Target } from 'lucide-react'

function NumberGuess({ addPoints }) {
  const [targetNumber, setTargetNumber] = useState(() => 
    Math.floor(Math.random() * 100) + 1
  )
  const [guess, setGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [message, setMessage] = useState('')
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)

  const maxGuesses = 10

  const handleGuess = (e) => {
    e.preventDefault()
    const num = parseInt(guess)

    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Please enter a number between 1 and 100')
      return
    }

    if (guesses.some(g => g.number === num)) {
      setMessage('You already guessed that number!')
      return
    }

    const newGuesses = [...guesses, { number: num, time: Date.now() }]
    setGuesses(newGuesses)
    setGuess('')

    if (num === targetNumber) {
      setGameWon(true)
      setMessage('🎉 YOU WIN!')
      const points = Math.max(100 - (newGuesses.length * 5), 10)
      addPoints(points)
    } else if (newGuesses.length >= maxGuesses) {
      setGameLost(true)
      setMessage(`Game Over! The number was ${targetNumber}`)
    } else if (num < targetNumber) {
      setMessage('Too low! Try higher 📈')
    } else {
      setMessage('Too high! Try lower 📉')
    }
  }

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setGuesses([])
    setMessage('')
    setGameWon(false)
    setGameLost(false)
  }

  const getHint = () => {
    if (guesses.length === 0) return 'Start guessing!'
    const lastGuess = guesses[guesses.length - 1].number
    const diff = Math.abs(targetNumber - lastGuess)
    
    if (diff <= 5) return '🔥 VERY HOT!'
    if (diff <= 10) return '🌡️ Hot'
    if (diff <= 20) return '😐 Warm'
    if (diff <= 30) return '🧊 Cool'
    return '❄️ Cold'
  }

  return (
    <div className="max-w-2xl">
      <div className="border-4 border-black p-6">
        <h3 className="font-['Khand'] text-4xl font-bold mb-4">NUMBER GUESSER</h3>
        <p className="text-lg mb-4">
          Guess the number between 1 and 100 in {maxGuesses} tries
        </p>

        <div className="flex gap-4 mb-4">
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">
              Guesses: {guesses.length} / {maxGuesses}
            </span>
          </div>
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">{getHint()}</span>
          </div>
        </div>

        {(gameWon || gameLost) && (
          <div className={`${gameWon ? 'bg-purple-600' : 'bg-red-600'} text-white border-2 border-black p-4 mb-4`}>
            <div className="flex items-center gap-2 font-bold text-xl">
              {gameWon ? <Trophy className="w-6 h-6" /> : <Target className="w-6 h-6" />}
              {message}
            </div>
          </div>
        )}

        {!gameWon && !gameLost && message && (
          <div className="bg-gray-100 border-2 border-black p-4 mb-4">
            <div className="font-semibold text-lg flex items-center gap-2">
              {message.includes('low') && <ArrowUp className="w-5 h-5" />}
              {message.includes('high') && <ArrowDown className="w-5 h-5" />}
              {message}
            </div>
          </div>
        )}

        <form onSubmit={handleGuess} className="mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameWon || gameLost}
            className="w-full border-4 border-black p-4 text-2xl font-bold text-center mb-4 focus:outline-none focus:ring-4 focus:ring-purple-600"
            placeholder="Enter your guess..."
            min="1"
            max="100"
          />
          <button
            type="submit"
            disabled={gameWon || gameLost}
            className="w-full bg-purple-600 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            GUESS
          </button>
        </form>

        {/* Guess history */}
        {guesses.length > 0 && (
          <div className="border-2 border-black p-4 mb-4">
            <h4 className="font-bold mb-2">Previous Guesses:</h4>
            <div className="flex flex-wrap gap-2">
              {guesses.map((g, idx) => (
                <div
                  key={idx}
                  className={`border-2 border-black px-3 py-1 font-semibold ${
                    g.number === targetNumber
                      ? 'bg-green-500 text-white'
                      : g.number < targetNumber
                      ? 'bg-blue-200'
                      : 'bg-red-200'
                  }`}
                >
                  {g.number}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-black text-white border-4 border-black px-6 py-3 font-bold text-xl hover:bg-gray-800"
        >
          NEW GAME
        </button>
      </div>
    </div>
  )
}

export default NumberGuess