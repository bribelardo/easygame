import { useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'

const emojis = ['🎮', '🎨', '🎵', '⚡', '🔥', '💎', '🚀', '⭐']

function MemoryGame({ addPoints }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji }))
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) {
      return
    }

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      const firstCard = cards.find((c) => c.id === first)
      const secondCard = cards.find((c) => c.id === second)

      if (firstCard.emoji === secondCard.emoji) {
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setFlipped([])

        if (newMatched.length === cards.length) {
          setGameWon(true)
          const points = Math.max(50 - moves * 2, 10)
          addPoints(points)
        }
      } else {
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="border-4 border-black p-6 mb-4">
        <h3 className="font-['Khand'] text-4xl font-bold mb-4">MEMORY MATCH</h3>
        <div className="flex gap-4 items-center mb-4">
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">Moves: {moves}</span>
          </div>
          <div className="border-2 border-black px-4 py-2">
            <span className="font-semibold">
              Matched: {matched.length / 2} / {emojis.length}
            </span>
          </div>
        </div>

        {gameWon && (
          <div className="bg-red-600 text-white border-2 border-black p-4 mb-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Trophy className="w-6 h-6" />
              YOU WIN! Moves: {moves}
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 mb-4">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id)
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square border-4 border-black text-4xl font-bold transition-all ${
                  isFlipped
                    ? 'bg-white'
                    : 'bg-black hover:bg-gray-800'
                }`}
                disabled={isFlipped && matched.includes(card.id)}
              >
                {isFlipped ? card.emoji : ''}
              </button>
            )
          })}
        </div>

        <button
          onClick={initGame}
          className="w-full bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:bg-red-700"
        >
          NEW GAME
        </button>
      </div>
    </div>
  )
}

export default MemoryGame