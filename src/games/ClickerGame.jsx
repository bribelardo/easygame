import { useState, useEffect } from 'react'
import { MousePointerClick, TrendingUp } from 'lucide-react'

const upgrades = [
  { id: 'cursor', name: 'Auto Clicker', baseCost: 15, cps: 0.1, owned: 0 },
  { id: 'grandma', name: 'Grandma', baseCost: 100, cps: 1, owned: 0 },
  { id: 'farm', name: 'Click Farm', baseCost: 500, cps: 8, owned: 0 },
  { id: 'factory', name: 'Click Factory', baseCost: 3000, cps: 47, owned: 0 },
  { id: 'mine', name: 'Click Mine', baseCost: 10000, cps: 260, owned: 0 },
]

function ClickerGame({ addPoints }) {
  const [clicks, setClicks] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [cps, setCps] = useState(0) // clicks per second
  const [ownedUpgrades, setOwnedUpgrades] = useState(upgrades)
  const [totalEarned, setTotalEarned] = useState(0)

  // Auto-clicker
  useEffect(() => {
    if (cps === 0) return

    const interval = setInterval(() => {
      setClicks((c) => c + cps / 10)
    }, 100)

    return () => clearInterval(interval)
  }, [cps])

  // Calculate CPS
  useEffect(() => {
    const totalCps = ownedUpgrades.reduce(
      (sum, upgrade) => sum + upgrade.cps * upgrade.owned,
      0
    )
    setCps(totalCps)
  }, [ownedUpgrades])

  const handleClick = () => {
    setClicks(clicks + clickPower)
    setTotalEarned(totalEarned + clickPower)
  }

  const buyUpgrade = (upgrade) => {
    const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned))
    if (clicks < cost) return

    setClicks(clicks - cost)
    setOwnedUpgrades(
      ownedUpgrades.map((u) =>
        u.id === upgrade.id ? { ...u, owned: u.owned + 1 } : u
      )
    )
  }

  const getCost = (upgrade) => {
    return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned))
  }

  const convertToPoints = () => {
    const points = Math.floor(clicks / 10)
    if (points === 0) return
    
    addPoints(points)
    setClicks(0)
    setOwnedUpgrades(upgrades.map(u => ({ ...u, owned: 0 })))
    setCps(0)
  }

  return (
    <div className="max-w-4xl">
      <div className="border-4 border-black p-6">
        <h3 className="font-['Khand'] text-4xl font-bold mb-4">MEGA CLICKER</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Clicking area */}
          <div>
            <div className="border-2 border-black p-4 mb-4 text-center">
              <div className="text-sm font-semibold text-gray-600 mb-2">CLICKS</div>
              <div className="font-['Khand'] text-6xl font-bold">
                {Math.floor(clicks)}
              </div>
              <div className="text-sm font-semibold text-gray-600 mt-2">
                per second: {cps.toFixed(1)}
              </div>
            </div>

            <button
              onClick={handleClick}
              className="w-full aspect-square bg-yellow-400 border-8 border-black hover:bg-yellow-500 active:scale-95 transition-transform mb-4 flex items-center justify-center"
            >
              <MousePointerClick className="w-32 h-32" />
            </button>

            <div className="border-2 border-black p-4 mb-4">
              <div className="text-sm font-semibold mb-2">STATS</div>
              <div className="text-sm space-y-1">
                <div>Click Power: {clickPower}</div>
                <div>Total Earned: {Math.floor(totalEarned)}</div>
                <div>Clicks per Second: {cps.toFixed(1)}</div>
              </div>
            </div>

            <button
              onClick={convertToPoints}
              disabled={clicks < 10}
              className="w-full bg-green-600 text-white border-4 border-black px-4 py-3 font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONVERT TO POINTS ({Math.floor(clicks / 10)} pts)
            </button>
          </div>

          {/* Upgrades */}
          <div>
            <div className="border-2 border-black p-4 mb-4">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <TrendingUp className="w-6 h-6" />
                UPGRADES
              </div>

              <div className="space-y-2">
                {ownedUpgrades.map((upgrade) => {
                  const cost = getCost(upgrade)
                  const canAfford = clicks >= cost

                  return (
                    <button
                      key={upgrade.id}
                      onClick={() => buyUpgrade(upgrade)}
                      disabled={!canAfford}
                      className={`w-full border-2 border-black p-3 text-left transition-colors ${
                        canAfford
                          ? 'hover:bg-yellow-100 cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold">{upgrade.name}</div>
                        <div className="text-sm font-semibold bg-black text-white px-2 py-1">
                          {upgrade.owned}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        +{upgrade.cps} clicks/sec
                      </div>
                      <div className="font-semibold">
                        Cost: {cost} clicks
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClickerGame