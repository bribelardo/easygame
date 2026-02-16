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
    { id: 'surprise', name: 'SURPRISE', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 'vibe', name: 'VIBES', icon: Music, color: 'text-sky-500', bg: 'bg-sky-50' },
    { id: 'games', name: 'GAMES', icon: Gamepad2, color: 'text-violet-500', bg: 'bg-violet-50' },
    { id: 'settings', name: 'SETTINGS', icon: SettingsIcon, color: 'text-amber-500', bg: 'bg-amber-50' },
  ]

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        
        {/* Modern Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              BOREDOM <span className="text-pink-500">BUSTER</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Player:</span>
              <span className="font-bold text-gray-800">{nickname || 'Guest'}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-100">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-amber-700">{points} PTS</span>
            </div>
          </div>
        </header>

        {/* Improved Navigation - Clean Pills */}
        <nav className="flex justify-center gap-2 md:gap-4 p-2 bg-white rounded-full shadow-sm border border-gray-100 self-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 md:px-8 py-3 rounded-full font-bold transition-all duration-300
                  ${isActive 
                    ? `${tab.bg} ${tab.color} shadow-inner scale-95` 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:block text-xs tracking-widest uppercase">{tab.name}</span>
              </button>
            )
          })}
        </nav>

        {/* Main Content Area - Clean White Space */}
        <main className="w-full min-h-[600px] bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-50">
          <div className="max-w-4xl mx-auto">
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
          </div>
        </main>
      </div>
    </div>
  )
}

export default App