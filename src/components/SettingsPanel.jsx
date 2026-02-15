import { useState } from 'react'
import { User, Trophy, RotateCcw, Save } from 'lucide-react'

const SettingsPanel = ({ points, setPoints, nickname, setNickname }) => {
  const [tempNickname, setTempNickname] = useState(nickname)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleSaveNickname = () => {
    localStorage.setItem('userNickname', tempNickname)
    setNickname(tempNickname)
  }

  const handleReset = () => {
    localStorage.clear()
    setPoints(0)
    setNickname('')
    setTempNickname('')
    setShowResetConfirm(false)
  }

  const getTrophyLevel = () => {
    if (points >= 1000) return 'LEGEND'
    if (points >= 500) return 'MASTER'
    if (points >= 250) return 'EXPERT'
    if (points >= 100) return 'PRO'
    if (points >= 50) return 'RISING STAR'
    return 'BEGINNER'
  }

  return (
    <div className="space-y-12 w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center space-y-4 w-full">
        <h2 className="text-5xl font-bold tracking-tight" style={{ fontFamily: "'Iceland', sans-serif" }}>
          SETTINGS
        </h2>
        <p className="text-xl text-gray-600" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          Manage your profile and progress
        </p>
      </div>

      {/* Profile Card */}
      <div className="cute-card p-12 bg-white rounded-2xl">
        <div className="space-y-8">
          {/* Avatar and Name - CENTERED */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 text-white mx-auto flex items-center justify-center mb-4 shadow-lg">
              <span className="text-6xl font-bold" style={{ fontFamily: "'Iceland', sans-serif" }}>
                {nickname ? nickname.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
              {nickname || 'ANONYMOUS'}
            </h3>
            <div className="inline-block rounded-xl bg-gray-800 text-white px-8 py-3 font-bold" style={{ fontFamily: "'Zen Dots', sans-serif" }}>
              {getTrophyLevel()}
            </div>
          </div>

          {/* Stats - GRID */}
          <div className="grid grid-cols-2 gap-6">
            <div className="cute-card border-2 border-pink-100 p-6 rounded-xl">
              <Trophy className="w-8 h-8 mb-2 text-amber-500" />
              <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                TOTAL POINTS
              </p>
              <p className="text-4xl font-bold" style={{ fontFamily: "'Zen Dots', sans-serif" }}>
                {points}
              </p>
            </div>

            <div className="cute-card border-2 border-pink-100 p-6 rounded-xl">
              <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                NEXT LEVEL
              </p>
              <p className="text-xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                {points >= 1000 
                  ? 'MAX LEVEL' 
                  : `${[50, 100, 250, 500, 1000].find(x => x > points) - points} PTS`
                }
              </p>
              <div className="mt-3 bg-gray-200 h-3">
                <div 
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nickname Section */}
      <div className="cute-card border-2 border-pink-100 p-10 bg-white rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6" />
          <h3 className="text-2xl font-bold tracking-wider" style={{ fontFamily: "'Iceland', sans-serif" }}>
            CHANGE NICKNAME
          </h3>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
            placeholder="ENTER YOUR NICKNAME..."
            maxLength={20}
            className="flex-1 px-6 py-4 border-2 border-black focus:outline-none text-lg uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
          />
          <button
            onClick={handleSaveNickname}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            <Save className="w-5 h-5" />
            SAVE
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="cute-card border-2 border-pink-100 p-10 bg-white rounded-2xl">
        <h3 className="text-3xl font-bold mb-8 tracking-wider" style={{ fontFamily: "'Iceland', sans-serif" }}>
          ACHIEVEMENTS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'FIRST STEPS', points: 0, unlocked: points >= 0 },
            { name: 'GETTING STARTED', points: 50, unlocked: points >= 50 },
            { name: 'CENTURY CLUB', points: 100, unlocked: points >= 100 },
            { name: 'QUARTER MASTER', points: 250, unlocked: points >= 250 },
            { name: 'HALF LEGEND', points: 500, unlocked: points >= 500 },
            { name: 'MAXED OUT', points: 1000, unlocked: points >= 1000 },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`
                p-6 rounded-xl text-center transition-all
                ${achievement.unlocked 
                  ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white' 
                  : 'bg-gray-50 text-gray-400 border-2 border-gray-200'
                }
              `}
            >
              <Trophy className={`w-10 h-10 mx-auto mb-3 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
              <p className="font-bold text-sm mb-1" style={{ fontFamily: "'Zen Dots', sans-serif", fontSize: '0.65rem' }}>
                {achievement.name}
              </p>
              <p className="text-xs" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                {achievement.points} PTS
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Section */}
      <div className="cute-card border-2 border-pink-100 p-10 bg-white rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <RotateCcw className="w-6 h-6" />
          <h3 className="text-2xl font-bold tracking-wider" style={{ fontFamily: "'Iceland', sans-serif" }}>
            RESET ALL DATA
          </h3>
        </div>
        <p className="text-gray-600 mb-6" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          This will permanently delete all your progress, points, and settings
        </p>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-8 py-4 rounded-xl bg-red-400 text-white font-semibold hover:bg-red-500 transition-all duration-300"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            RESET EVERYTHING
          </button>
        ) : (
          <div className="space-y-4">
            <p className="font-bold text-lg" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
              ARE YOU SURE?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="px-8 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                YES, RESET
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-8 py-4 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all duration-300"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPanel