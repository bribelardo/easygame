import { useState } from 'react'
import { User, Trophy, RotateCcw, Save, ShieldAlert, Award } from 'lucide-react'

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

  const nextMilestone = [50, 100, 250, 500, 1000].find(x => x > points) || 1000
  const progressPercent = Math.min((points / nextMilestone) * 100, 100)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          USER <span className="text-pink-500">PROFILE</span>
        </h2>
        <p className="text-lg text-gray-500 font-medium">Manage your identity and track progress</p>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card (Large) */}
        <div className="md:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-[24px] bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center shadow-lg shadow-pink-200">
              <span className="text-5xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {nickname ? nickname.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-gray-50">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight">{nickname || 'ANONYMOUS'}</h3>
              <span className="inline-block mt-1 px-4 py-1 rounded-full bg-gray-900 text-white text-[10px] font-black tracking-[0.2em] uppercase">
                {getTrophyLevel()}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Rank Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Points Card (Small) */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-2">
          <Trophy className="w-10 h-10 text-amber-500 mb-2" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Points</span>
          <span className="text-5xl font-black text-gray-900 tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {points}
          </span>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nickname Change */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-pink-500" />
            <h4 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Identity Settings</h4>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              placeholder="Enter your nickname..."
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all font-bold text-gray-700"
            />
            <button
              onClick={handleSaveNickname}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-gray-200"
            >
              <Save className="w-4 h-4" />
              SAVE CHANGES
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50/50 p-8 rounded-[32px] border border-red-100 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h4 className="font-bold text-red-800 uppercase tracking-widest text-sm">Danger Zone</h4>
          </div>
          <p className="text-sm text-red-600 font-medium">Resetting will permanently delete your rank and progress.</p>
          
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-4 bg-white border border-red-200 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              RESET ALL DATA
            </button>
          ) : (
            <div className="flex gap-2 animate-in zoom-in-95">
              <button onClick={handleReset} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold text-xs uppercase">Confirm</button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold text-xs uppercase">Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 uppercase tracking-widest text-sm mb-8 text-center">Badges & Achievements</h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { name: 'Rookie', pts: 0 },
            { name: 'Starter', pts: 50 },
            { name: 'Century', pts: 100 },
            { name: 'Elite', pts: 250 },
            { name: 'Legend', pts: 500 },
            { name: 'Godly', pts: 1000 },
          ].map((ach) => (
            <div
              key={ach.name}
              className={`p-4 rounded-[24px] text-center space-y-2 border-2 transition-all
                ${points >= ach.pts 
                  ? 'bg-white border-pink-100 shadow-md' 
                  : 'bg-gray-50 border-transparent opacity-40 grayscale'}`}
            >
              <Award className={`w-8 h-8 mx-auto ${points >= ach.pts ? 'text-pink-500' : 'text-gray-300'}`} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-gray-900">{ach.name}</p>
                <p className="text-[9px] font-bold text-gray-400">{ach.pts} PTS</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel