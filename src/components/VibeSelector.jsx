import { useState } from 'react'
import { Brain, Zap, Cloud, Heart, PartyPopper, BookOpen, ExternalLink } from 'lucide-react'

const VibeSelector = ({ addPoints }) => {
  const [selectedVibe, setSelectedVibe] = useState(null)

  const vibes = [
    {
      id: 'focus',
      name: 'FOCUS',
      icon: Brain,
      color: 'text-sky-500',
      playlists: [
        { name: 'Lo-fi Beats', url: 'https://spotify.com' },
        { name: 'Peaceful Piano', url: 'https://spotify.com' },
        { name: 'Study Music', url: 'https://youtube.com' },
      ],
    },
    {
      id: 'hype',
      name: 'HYPE',
      icon: Zap,
      color: 'text-amber-500',
      playlists: [
        { name: 'Beast Mode', url: 'https://spotify.com' },
        { name: 'Workout Motivation', url: 'https://youtube.com' },
        { name: 'Power Hour', url: 'https://spotify.com' },
      ],
    },
    {
      id: 'chill',
      name: 'CHILL',
      icon: Cloud,
      color: 'text-teal-500',
      playlists: [
        { name: 'Chill Hits', url: 'https://spotify.com' },
        { name: 'Ambient Relaxation', url: 'https://youtube.com' },
        { name: 'Sunday Morning', url: 'https://spotify.com' },
      ],
    },
    {
      id: 'sad',
      name: 'SAD',
      icon: Heart,
      color: 'text-pink-500',
      playlists: [
        { name: 'Sad Songs', url: 'https://spotify.com' },
        { name: 'Life Sucks', url: 'https://spotify.com' },
        { name: 'Heartbreak Acoustic', url: 'https://youtube.com' },
      ],
    },
    {
      id: 'party',
      name: 'PARTY',
      icon: PartyPopper,
      color: 'text-orange-500',
      playlists: [
        { name: 'Party Hits', url: 'https://spotify.com' },
        { name: 'Dance Party', url: 'https://spotify.com' },
        { name: 'EDM Bangers', url: 'https://youtube.com' },
      ],
    },
    {
      id: 'study',
      name: 'STUDY',
      icon: BookOpen,
      color: 'text-indigo-500',
      playlists: [
        { name: 'Instrumental Study', url: 'https://spotify.com' },
        { name: 'Classical Focus', url: 'https://youtube.com' },
        { name: 'Cafe Ambience', url: 'https://youtube.com' },
      ],
    },
  ]

  const handleVibeClick = (vibe) => {
    setSelectedVibe(vibe)
    addPoints(3)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Alignment */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          VIBE <span className="text-pink-500">CHECK</span>
        </h2>
        <p className="text-lg text-gray-500 font-medium">What's your mood today?</p>
      </div>

      {/* Grid Alignment: 3 columns with uniform gaps */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {vibes.map((vibe) => {
          const Icon = vibe.icon
          const isSelected = selectedVibe?.id === vibe.id
          return (
            <button
              key={vibe.id}
              onClick={() => handleVibeClick(vibe)}
              className={`
                relative overflow-hidden p-8 rounded-3xl border-2 transition-all duration-300
                flex flex-col items-center justify-center gap-4
                ${isSelected 
                  ? 'border-pink-500 bg-pink-50 ring-4 ring-pink-100' 
                  : 'border-gray-100 bg-white hover:border-pink-200 hover:shadow-lg hover:-translate-y-1'}
              `}
            >
              <Icon className={`w-10 h-10 ${isSelected ? 'text-pink-500' : vibe.color}`} />
              <span className={`font-bold tracking-widest text-sm ${isSelected ? 'text-pink-600' : 'text-gray-600'}`}>
                {vibe.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Playlist Section Alignment */}
      {selectedVibe && (
        <div className="mt-12 p-8 rounded-[32px] bg-gray-50 border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-pink-200"></div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">
              {selectedVibe.name} SELECTIONS
            </h3>
            <div className="h-[2px] w-8 bg-pink-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedVibe.playlists.map((playlist, index) => (
              <a
                key={index}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-pink-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-xs font-bold text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500 transition-colors">
                    {index + 1}
                  </span>
                  <span className="font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {playlist.name}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-pink-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VibeSelector