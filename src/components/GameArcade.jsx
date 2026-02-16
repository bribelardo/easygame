import { useState } from 'react'
import { ArrowLeft, Gamepad2, Play, Trophy } from 'lucide-react'
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
      description: 'Test your brain and match pairs',
      component: MemoryGame,
      difficulty: 'Easy',
      reward: '+10 PTS'
    },
    {
      id: 'snake',
      name: 'SNAKE',
      description: 'The classic retro experience',
      component: SnakeGame,
      difficulty: 'Medium',
      reward: '+15 PTS'
    },
    {
      id: 'typing',
      name: 'TYPING SPEED',
      description: 'How fast can you type?',
      component: TypingTest,
      difficulty: 'Hard',
      reward: '+20 PTS'
    },
    {
      id: 'guess',
      name: 'NUMBER GUESS',
      description: 'Can you beat the odds?',
      component: NumberGuess,
      difficulty: 'Easy',
      reward: '+5 PTS'
    },
    {
      id: 'clicker',
      name: 'MEGA CLICKER',
      description: 'Speed and precision',
      component: ClickerGame,
      difficulty: 'Easy',
      reward: '+5 PTS'
    },
  ]

  if (selectedGame) {
    const GameComponent = selectedGame.component
    return (
      <div className="space-y-6 animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setSelectedGame(null)}
          className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-2xl border border-gray-100 hover:bg-gray-50 hover:text-pink-500 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-xs uppercase">Back to Arcade</span>
        </button>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-xl">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-white to-pink-50/30">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {selectedGame.name}
              </h2>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-xs mt-1">
                {selectedGame.description}
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-inner border border-gray-50">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-amber-600 tracking-tighter">{selectedGame.reward}</span>
            </div>
          </div>

          <div className="p-10 flex justify-center">
             <div className="w-full max-w-2xl bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200">
                <GameComponent addPoints={addPoints} />
             </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          GAME <span className="text-pink-500">ARCADE</span>
        </h2>
        <p className="text-lg text-gray-500 font-medium">Choose your challenge and level up</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="group relative flex flex-col bg-white p-8 rounded-[32px] border border-gray-100 hover:border-pink-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter uppercase 
                ${game.difficulty === 'Easy' ? 'bg-green-50 text-green-600' : 
                  game.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                {game.difficulty}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-pink-600 transition-colors">
                {game.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {game.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{game.reward}</span>
              </div>
              <div className="p-2 bg-pink-500 text-white rounded-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                <Play className="w-4 h-4 fill-current" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameArcade