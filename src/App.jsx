import { useState, useEffect } from 'react'
import { Sparkles, Music, Gamepad2, Settings as SettingsIcon, Trophy } from 'lucide-react'
import SurpriseMe from './components/SurpriseMe'
import VibeSelector from './components/VibeSelector'
import GameArcade from './components/GameArcade'
import SettingsPanel from './components/SettingsPanel'

function App() {
  const [activeTab, setActiveTab] = useState('surprise')
  const [points, setPoints] = useState(0)
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    const savedPoints = localStorage.getItem('boredomPoints')
    const savedNickname = localStorage.getItem('userNickname')
    if (savedPoints) setPoints(parseInt(savedPoints))
    if (savedNickname) setNickname(savedNickname)
  }, [])

  const addPoints = (amount) => {
    const newPoints = points + amount
    setPoints(newPoints)
    localStorage.setItem('boredomPoints', newPoints)
  }

  const tabs = [
    { id: 'surprise', name: 'SURPRISE', icon: Sparkles, gradient: 'from-pink-400 to-pink-500' },
    { id: 'vibe', name: 'VIBES', icon: Music, gradient: 'from-sky-300 to-teal-400' },
    { id: 'games', name: 'GAMES', icon: Gamepad2, gradient: 'from-violet-300 to-pink-400' },
    { id: 'settings', name: 'SETTINGS', icon: SettingsIcon, gradient: 'from-amber-300 to-yellow-400' },
  ]

  return (
    <div className="w-full min-h-screen bg-[#FFF5F7] flex flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-5xl flex flex-col items-center space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-4" style={{ fontFamily: "'Iceland', sans-serif" }}>
            BOREDOM BUSTER
          </h1>
          {nickname && (
            <div className="flex items-center justify-center gap-4">
              <span className="px-6 py-2 rounded-2xl bg-white/80 text-gray-800 font-semibold shadow-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Hey, {nickname}
              </span>
              <span className="px-6 py-2 rounded-2xl bg-white/80 text-gray-800 font-semibold shadow-sm flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                <Trophy className="w-5 h-5 text-amber-500" />
                {points}
              </span>
            </div>
          )}
        </header>

        {/* Navigation - Separate rounded buttons */}
        <nav className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-8 py-4 rounded-2xl font-semibold text-white text-sm uppercase tracking-wide
                  bg-gradient-to-r ${tab.gradient}
                  shadow-lg shadow-gray-300/50 hover:shadow-xl hover:shadow-gray-300/60
                  hover:-translate-y-0.5 transition-all duration-300
                  ${isActive ? 'ring-4 ring-white/40 scale-[1.02]' : ''}
                `}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Main Content Card - Floating white card */}
        <main className="w-full rounded-3xl bg-white p-8 md:p-12 shadow-xl shadow-pink-200/30 min-h-[500px]">
          {activeTab === 'surprise' && <SurpriseMe addPoints={addPoints} />}
          {activeTab === 'vibe' && <VibeSelector addPoints={addPoints} />}
          {activeTab === 'games' && <GameArcade addPoints={addPoints} />}
          {activeTab === 'settings' && (
            <SettingsPanel
              points={points}
              setPoints={setPoints}
              nickname={nickname}
              setNickname={setNickname}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App