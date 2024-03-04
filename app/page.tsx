import type { NextPage } from 'next'
import { GameBoard } from '../components/GameBoard'
import { GameStateClass } from '../models/GameStateClass'

const Home: NextPage = () => {
  return (
    <div>
      <GameBoard />
    </div>
  )
}

export default Home
