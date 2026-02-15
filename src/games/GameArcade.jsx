import { useState } from 'react'
import { ArrowLeft, Play } from 'lucide-react'
import MemoryGame from './games/MemoryGame'
import SnakeGame from './games/SnakeGame'
import TypingTest from './games/TypingTest'
import NumberGuess from './games/NumberGuess'
import ClickerGame from './games/ClickerGame'

const games = [
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Find matching pairs of cards',
    component: MemoryGame,
    color: '#f03a47',
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Classic snake game',
    component: SnakeGame,
    color: '#00f593',
  },
  {
    id: 'typing',
    name: 'Typing Speed',
    description: 'Test your WPM',
    component: TypingTest,
    color: '#0099ff',
  },
  {
    id: 'guess',
    name: 'Number Guess',
    description: 'Guess the number',
    component: NumberGuess,
    color: '#ffad1f',
  },
  {
    id: 'clicker',
    name: 'Mega Clicker',
    description: 'Click to earn points',
    component: ClickerGame,
    color: '#9147ff',
  },
]

function GameArcade({ addPoints }) {
  const [selectedGame, setSelectedGame] = useState(null)

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div className="space-y-6 fade-in">
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>

        <div className="p-8 rounded-xl" style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)'
        }}>
          <GameComponent addPoints={addPoints} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          Game Arcade
        </h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Play games, earn points, level up your skills
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="text-left p-6 rounded-xl card-hover group"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Game Icon */}
            <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{
              background: `${game.color}20`,
              border: `2px solid ${game.color}`
            }}>
              <Play className="w-8 h-8" style={{ color: game.color }} />
            </div>

            {/* Game Info */}
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {game.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {game.description}
            </p>

            {/* Play Button */}
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: game.color }}>
              <Play className="w-4 h-4" />
              Play Now
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameArcade