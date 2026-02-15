import { Gamepad2 } from 'lucide-react';

/**
 * Mini-Game Arcade — modular container; placeholder shell for Clicker/2048.
 * Triggers parent to switch to Game view.
 */
export default function MiniGameArcade({ onPlayGame }) {
  return (
    <div className="border-4 border-brutal-black p-6 bg-brutal-white flex flex-col gap-6">
      <h2 className="font-header font-bold text-2xl uppercase tracking-tight flex items-center gap-2">
        <Gamepad2 size={24} strokeWidth={2.5} />
        Mini-Game Arcade
      </h2>
      <p className="font-body text-sm text-brutal-black/80">
        Quick escape. Lightweight games. No commitment.
      </p>
      <button
        onClick={onPlayGame}
        className="w-full py-4 px-6 bg-brutal-black text-brutal-white font-body font-semibold uppercase tracking-wide border-4 border-brutal-black hover:bg-brutal-white hover:text-brutal-black transition-colors"
      >
        Play Clicker
      </button>
    </div>
  );
}
