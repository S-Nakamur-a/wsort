'use client'

import { useState } from 'react'
import useGameState from '../hooks/useGameState'
import { GameState, Water, pour } from '../interfaces/Game'
import styles from '@/styles/GameBoard.module.css'

export const GameBoard = () => {
  const [colorNumber, setColorNumber] = useState<number>(3)
  const {
    gameState,
    updateGameState,
    undoGameState,
    resetGameState,
    startNewGame,
    setGameStateAndResetHistory,
  } = useGameState(colorNumber)
  const [selectedBottle, setSelectedBottle] = useState<number | null>(null)

  const handleBottleClick = (index: number) => {
    if (selectedBottle === null) {
      setSelectedBottle(index) // 最初のボトルを選択
    } else {
      // 色の移動ロジック
      const fromBottle = gameState.bottles[selectedBottle]
      const toBottle = gameState.bottles[index]
      if (selectedBottle !== index) {
        const [newFromBottle, newToBottle] = pour(fromBottle, toBottle)
        const newGameState = {
            ...gameState,
            bottles: gameState.bottles.map((bottle, i) =>
            i === selectedBottle
                ? newFromBottle
                : i === index
                ? newToBottle
                : bottle
            ),
            export: gameState.export,
            import: gameState.import,
        }
        updateGameState(newGameState)

      }
      setSelectedBottle(null) // 選択状態をリセット
    }
  }

  const handleColorNumberChange = (newColorNumber: number) => {
    setColorNumber(newColorNumber)
    startNewGame(newColorNumber)
  }
  const onImport = (gameStateString: string) => {
    setGameStateAndResetHistory(gameState.import(gameStateString))
    setColorNumber(gameState.nColors)
  }
  return (
    <div className={styles.gameContainer}>
      <h1>GameBoard</h1>
      <div className={styles.gameBoard}>
        {gameState.bottles.map((bottle, index) => (
          <div
            key={index}
            className={`${styles.bottle} ${selectedBottle === index ? styles.selected : ''}`}
            onClick={() => handleBottleClick(index)}
          >
            <BottleContentComponent
              waters={bottle.waters}
              maxCapacitySize={bottle.getMaxCapacitySize()}
            />
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={undoGameState}>
        1手戻る
      </button>
      <button className={styles.button} onClick={resetGameState}>
        リセットする
      </button>
      <button className={styles.button} onClick={()=>{startNewGame(colorNumber)}}>
        新しいゲームを始める
      </button>
      <ColorNumberSliderComponent
        colorNumber={colorNumber}
        onColorNumberChange={handleColorNumberChange}
      />
      <ExportGameStateComponent gameState={gameState} />
      <ImportGameStateComponent onImport={onImport} />
    </div>
  )
}

type BottleContentComponentProps = {
  waters: readonly Water[]
  maxCapacitySize: number
}

const BottleContentComponent: React.FC<BottleContentComponentProps> = (
  props
) => {
  const emptySpaces = props.maxCapacitySize - props.waters.length
  return (
    <>
      {/* bottleは水の描画をCSSでreverseしている */}
      {props.waters.map((water, index) => (
        <div
          key={index}
          className={`${styles.water} ${index === 0 ? styles.bottom : ''}`}
          style={{ backgroundColor: water.colorHexCode }}
        >
          {water.label}
        </div>
      ))}
      {/* 空白部分を描画 */}
      {Array.from({ length: emptySpaces }, (_, index) => (
        <div key={`empty-${index}`} className={styles.emptySpace}></div>
      ))}
    </>
  )
}

type ColorNumberSliderComponentProps = {
  colorNumber: number
  onColorNumberChange: (colorNumber: number) => void
}

const ColorNumberSliderComponent: React.FC<ColorNumberSliderComponentProps> = (
  props
) => {
  return (
    <div>
      <input
        type="range"
        min="2"
        max="20"
        value={props.colorNumber}
        onChange={(e) => props.onColorNumberChange(parseInt(e.target.value))}
      />
      <span>{props.colorNumber}</span>
    </div>
  )
}

const ExportGameStateComponent: React.FC<{ gameState: GameState }> = (
  props
) => {
  const exportGameState = () => {
    return props.gameState.export()
  }
  return (
    <button className={styles.olive_button} onClick={() => window.prompt('この文字列をコピーしてください', exportGameState())}>
      このゲームを保存する (URLを生成)
    </button>
  )
  }

const ImportGameStateComponent: React.FC<{ onImport: (gameStateString: string) => void }> = (
  props
) => {
  const importGameState = () => {
    const gameStateString = window.prompt('保存した文字列を貼り付けてください')
    if (gameStateString) {
      props.onImport(gameStateString)
    }
  }
  return <button className={styles.olive_button} onClick={importGameState}>文字列からゲームを開始する</button>
}
