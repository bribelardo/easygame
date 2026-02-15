import { useState } from 'react'
import { Brain, Zap, Cloud, Heart, PartyPopper, BookOpen, ExternalLink } from 'lucide-react'

const VibeSelector = ({ addPoints }) => {
  const [selectedVibe, setSelectedVibe] = useState(null)

  const vibes = [
    {
      id: 'focus',
      name: 'FOCUS',
      icon: Brain,
      playlists: [
        { name: 'Lo-fi Beats', url: 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM' },
        { name: 'Peaceful Piano', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
        { name: 'Study Music', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
      ],
    },
    {
      id: 'hype',
      name: 'HYPE',
      icon: Zap,
      playlists: [
        { name: 'Beast Mode', url: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP' },
        { name: 'Workout Motivation', url: 'https://www.youtube.com/watch?v=wT87RNUL7Dk' },
        { name: 'Power Hour', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3WvGXE8FqYX' },
      ],
    },
    {
      id: 'chill',
      name: 'CHILL',
      icon: Cloud,
      playlists: [
        { name: 'Chill Hits', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6' },
        { name: 'Ambient Relaxation', url: 'https://www.youtube.com/watch?v=4EoxFGa7kUE' },
        { name: 'Sunday Morning', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0wMD1sSXj6T' },
      ],
    },
    {
      id: 'sad',
      name: 'SAD',
      icon: Heart,
      playlists: [
        { name: 'Sad Songs', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634' },
        { name: 'Life Sucks', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634' },
        { name: 'Heartbreak Acoustic', url: 'https://www.youtube.com/watch?v=OXgb2RnPJQM' },
      ],
    },
    {
      id: 'party',
      name: 'PARTY',
      icon: PartyPopper,
      playlists: [
        { name: 'Party Hits', url: 'https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif' },
        { name: 'Dance Party', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7XP' },
        { name: 'EDM Bangers', url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I' },
      ],
    },
    {
      id: 'study',
      name: 'STUDY',
      icon: BookOpen,
      playlists: [
        { name: 'Instrumental Study', url: 'https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6' },
        { name: 'Classical Focus', url: 'https://www.youtube.com/watch?v=BHACKCNDMW8' },
        { name: 'Cafe Ambience', url: 'https://www.youtube.com/watch?v=gaJqz32PfrU' },
      ],
    },
  ]

  const handleVibeClick = (vibe) => {
    setSelectedVibe(vibe)
    addPoints(3)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold" style={{ fontFamily: "'Iceland', sans-serif" }}>
          VIBE CHECK
        </h2>
        <p className="text-xl text-gray-600" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          What's your mood today?
        </p>
      </div>

      {/* Vibe Grid */}
      <div className="grid grid-cols-3 gap-8">
        {vibes.map((vibe) => {
          const Icon = vibe.icon
          const isSelected = selectedVibe?.id === vibe.id
          return (
            <button
              key={vibe.id}
              onClick={() => handleVibeClick(vibe)}
              className={`
                p-12 border-2 border-black transition-colors
                ${isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}
              `}
            >
              <div className="space-y-6">
                <Icon className="w-16 h-16 mx-auto" />
                <h3 className="text-2xl font-bold text-center" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                  {vibe.name}
                </h3>
              </div>
            </button>
          )
        })}
      </div>

      {/* Playlists */}
      {selectedVibe && (
        <div className="border-4 border-black p-10 bg-white">
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: "'Iceland', sans-serif" }}>
            {selectedVibe.name} PLAYLISTS
          </h3>

          <div className="grid grid-cols-3 gap-6">
            {selectedVibe.playlists.map((playlist, index) => (
              <a
                key={index}
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 border-2 border-black group-hover:border-white flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ fontFamily: "'Zen Dots', sans-serif" }}>
                      {index + 1}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                  {playlist.name}
                </h4>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VibeSelector