import { Bottle, GameState } from '@/interfaces/Game'
import { BottleClass } from './BottleClass'
import { WaterClass } from './WaterClass'

export class GameStateClass implements GameState {
  bottles: Bottle[]
  nColors: number

  constructor(bottles: Bottle[], nColors: number) {
    this.bottles = bottles
    this.nColors = nColors
  }

  static empty(): GameStateClass {
    return new GameStateClass([], 0)
  }

  static random(nColors: number): GameStateClass {
    // generate all waters(nColors * BottleClass.getMaxCapacitySize()) and shuffle
    const waters: WaterClass[] = Array.from({ length: nColors }, (_, i) =>
      Array.from({ length: BottleClass.maxCapacitySize }, () =>
        WaterClass.fromColorNumber(i)
      )
    ).flat()
    const randomWaters = waters.sort(() => Math.random() - 0.5)

    // fill bottles with random waters
    const bottles: Bottle[] = Array.from({ length: nColors }, (_, i) => {
      const start = i * BottleClass.maxCapacitySize
      const end = start + BottleClass.maxCapacitySize
      return new BottleClass(randomWaters.slice(start, end))
    })

    // add two empty bottles
    bottles.push(BottleClass.getEmptyBottle())
    bottles.push(BottleClass.getEmptyBottle())

    return new GameStateClass(bottles, nColors)
  }
}
