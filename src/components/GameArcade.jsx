import { useState } from 'react'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import MemoryGame from '../games/MemoryGame'
import SnakeGame from '../games/SnakeGame'
import TypingTest from '../games/TypingTest'
import NumberGuess from '../games/NumberGuess'
import ClickerGame from '../games/ClickerGame'

const GameArcade = ({ addPoints }) => {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    {
      id: 'memory',
      name: 'MEMORY MATCH',
      description: 'Match pairs of cards',
      component: MemoryGame,
    },
    {
      id: 'snake',
      name: 'SNAKE',
      description: 'Classic snake game',
      component: SnakeGame,
    },
    {
      id: 'typing',
      name: 'TYPING SPEED',
      description: 'Test your typing speed',
      component: TypingTest,
    },
    {
      id: 'guess',
      name: 'NUMBER GUESS',
      description: 'Guess the number',
      component: NumberGuess,
    },
    {
      id: 'clicker',
      name: 'MEGA CLICKER',
      description: 'Click to earn points',
      component: ClickerGame,
    },
  ]

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
          style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">BACK TO GAMES</span>
        </button>

        {/* Game Header */}
        <div className="border-4 border-black p-8 bg-white text-center">
          <h2 className="text-4xl font-bold tracking-wider" style={{ fontFamily: "'Iceland', sans-serif" }}>
            {selectedGame.name}
          </h2>
          <p className="text-lg text-gray-600 mt-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
            {selectedGame.description}
          </p>
        </div>

        {/* Game Component */}
        <div className="border-2 border-black p-10 bg-white">
          <GameComponent addPoints={addPoints} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "'Iceland', sans-serif" }}>
          GAME ARCADE
        </h2>
        <p className="text-xl text-gray-600" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          Pick a game and earn points
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="group border-2 border-black p-12 bg-white hover:bg-black hover:text-white transition-all duration-200 card-hover text-center"
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto border-2 border-black group-hover:border-white flex items-center justify-center transition-colors">
                <Gamepad2 className="w-12 h-12" />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold tracking-wider mb-3" style={{ fontFamily: "'Zen Dots', sans-serif" }}>
                  {game.name}
                </h3>
                <p className="text-base" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                  {game.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameArcade