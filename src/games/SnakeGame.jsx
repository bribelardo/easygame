import { useState, useEffect, useRef } from 'react'
import { Trophy } from 'lucide-react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

function SnakeGame({ addPoints }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const directionRef = useRef(INITIAL_DIRECTION)

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const gameLoop = setInterval(() => {
      moveSnake()
    }, GAME_SPEED)

    return () => clearInterval(gameLoop)
  }, [snake, isPlaying, gameOver])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return

      const key = e.key
      const currentDir = directionRef.current

      if (key === 'ArrowUp' && currentDir.y === 0) {
        directionRef.current = { x: 0, y: -1 }
        setDirection({ x: 0, y: -1 })
      } else if (key === 'ArrowDown' && currentDir.y === 0) {
        directionRef.current = { x: 0, y: 1 }
        setDirection({ x: 0, y: 1 })
      } else if (key === 'ArrowLeft' && currentDir.x === 0) {
        directionRef.current = { x: -1, y: 0 }
        setDirection({ x: -1, y: 0 })
      } else if (key === 'ArrowRight' && currentDir.x === 0) {
        directionRef.current = { x: 1, y: 0 }
        setDirection({ x: 1, y: 0 })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, gameOver])

  const moveSnake = () => {
    const head = snake[0]
    const newHead = {
      x: head.x + directionRef.current.x,
      y: head.y + directionRef.current.y,
    }

    // Check wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      endGame()
      return
    }

    // Check self collision
    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      endGame()
      return
    }

    const newSnake = [newHead, ...snake]

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 10)
      generateFood(newSnake)
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }

  const generateFood = (currentSnake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (
      currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    )
    setFood(newFood)
  }

  const endGame = () => {
    setGameOver(true)
    setIsPlaying(false)
    addPoints(score)
  }

  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood({ x: 15, y: 15 })
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setScore(0)
    setGameOver(false)
    setIsPlaying(true)
  }

  return (
    <div className="max-w-2xl">
      <div className="border-4 border-black p-6">
        <h3 className="font-['Khand'] text-4xl font-bold mb-4">SNAKE</h3>
        
        <div className="border-2 border-black px-4 py-2 mb-4 inline-block">
          <span className="font-semibold text-xl">SCORE: {score}</span>
        </div>

        {gameOver && (
          <div className="bg-red-600 text-white border-2 border-black p-4 mb-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Trophy className="w-6 h-6" />
              GAME OVER! Score: {score}
            </div>
          </div>
        )}

        <div
          className="border-4 border-black mb-4 mx-auto bg-gray-100"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            position: 'relative',
          }}
        >
          {/* Snake */}
          {snake.map((segment, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: idx === 0 ? '#000' : '#333',
                border: '1px solid #000',
              }}
            />
          ))}
          {/* Food */}
          <div
            style={{
              position: 'absolute',
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: '#FF0000',
              border: '2px solid #000',
            }}
          />
        </div>

        <div className="text-center mb-4 text-sm text-gray-700">
          Use arrow keys to control the snake
        </div>

        <button
          onClick={startGame}
          className="w-full bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-xl hover:bg-green-700"
        >
          {isPlaying ? 'RESTART' : 'START GAME'}
        </button>
      </div>
    </div>
  )
}

export default SnakeGame