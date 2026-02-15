import { useState } from 'react'
import { Sparkles } from 'lucide-react'

const SurpriseMe = ({ addPoints }) => {
  const [currentActivity, setCurrentActivity] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const activities = [
    { text: 'Try a new coffee flavor today', category: 'FOOD' },
    { text: 'Order your favorite comfort food', category: 'FOOD' },
    { text: 'Get bubble tea and explore new flavors', category: 'FOOD' },
    { text: 'Cook instant ramen with a twist', category: 'FOOD' },
    { text: 'Discover new music on Spotify', category: 'MUSIC' },
    { text: 'Listen to a podcast episode', category: 'MUSIC' },
    { text: 'Create a new playlist for your mood', category: 'MUSIC' },
    { text: 'Build a mini project for fun', category: 'CODE' },
    { text: 'Debug that annoying bug', category: 'CODE' },
    { text: 'Try a new framework or library', category: 'CODE' },
    { text: 'Read one chapter of your textbook', category: 'STUDY' },
    { text: 'Do practice problems for 25 mins', category: 'STUDY' },
    { text: 'Create flashcards for your exam', category: 'STUDY' },
    { text: 'Take a power nap (20 mins max!)', category: 'CHILL' },
    { text: 'Go for a short walk', category: 'CHILL' },
    { text: 'Do 5-minute meditation', category: 'CHILL' },
  ]

  const getRandomActivity = () => {
    setIsAnimating(true)
    const randomActivity = activities[Math.floor(Math.random() * activities.length)]
    
    setTimeout(() => {
      setCurrentActivity(randomActivity)
      addPoints(5)
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="space-y-12 flex flex-col items-center w-full">
      {/* Header */}
      <div className="text-center space-y-4 w-full">
        <h2 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "'Iceland', sans-serif" }}>
          SURPRISE ME
        </h2>
        <p className="text-xl text-gray-600" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          Can't decide? Let me pick a random activity for you
        </p>
      </div>

      {/* Surprise Button - Centered */}
      <div className="flex justify-center py-12">
        <button
          onClick={getRandomActivity}
          disabled={isAnimating}
          className={`
            px-16 py-8 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white
            font-bold text-xl tracking-wider shadow-lg shadow-pink-200/50
            transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
            flex items-center justify-center
            ${isAnimating ? 'animate-pulse' : ''}
          `}
          style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
        >
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="w-8 h-8" />
            <span>{isAnimating ? 'THINKING...' : 'SURPRISE ME'}</span>
            <Sparkles className="w-8 h-8" />
          </div>
        </button>
      </div>

      {/* Activity Card - Centered */}
      {currentActivity && (
        <div className="max-w-2xl mx-auto w-full">
          <div className="cute-card p-12 bg-white text-center space-y-6 rounded-2xl">
            <div className="inline-block rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {currentActivity.category}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
              {currentActivity.text}
            </h3>
            <div className="inline-block rounded-xl bg-gray-800 text-white px-8 py-3 font-bold" style={{ fontFamily: "'Zen Dots', sans-serif" }}>
              +5 POINTS
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurpriseMe