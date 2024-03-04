import { Water } from '@/interfaces/Game'

export class WaterClass implements Water {
  colorHexCode: string

  constructor(colorHexCode: string) {
    this.colorHexCode = colorHexCode
  }

  isSameColor(other: Water): boolean {
    return this.colorHexCode === other.colorHexCode
  }

  static allColors(): string[] {
    return [
      '#E6194B', // red
      '#3CB44B', // green
      '#FFE119', // yellow
      '#0082C8', // blue
      '#F58231', // orange
      '#911EB4', // purple
      '#46F0F0', // cyan
      '#F032E6', // magenta
      '#D2F53C', // lime
      '#FABEBE', // pink
      '#008080', // teal
      '#AA6E28', // brown
      '#FFFAC8', // beige
      '#800000', // maroon
      '#AAFFC3', // mint
      '#808000', // olive
      '#FFD8B1', // coral
      '#000080', // navy
      '#808080', // grey
      '#469990', // darker teal for replacement
    ]
  }

  static fromColorNumber(index: number): WaterClass {
    if (index < 0 || index >= WaterClass.maxColors()) {
      throw new Error('index is out of range')
    }
    return new WaterClass(WaterClass.allColors()[index])
  }

  static maxColors(): number {
    return WaterClass.allColors().length
  }
}
