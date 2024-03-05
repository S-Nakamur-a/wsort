import { Water } from '@/interfaces/Game'

export class WaterClass implements Water {
  colorHexCode: string
  label: string

  constructor(colorHexCode: string) {
    this.colorHexCode = colorHexCode
    this.label = (WaterClass.allColors().indexOf(colorHexCode) + 1).toString()
  }

  isSameColor(other: Water): boolean {
    return this.colorHexCode === other.colorHexCode
  }

  static allColors(): string[] {
    return [
      '#E6194B', // red
      '#21832e', // green
      '#FFE119', // yellow
      '#0082C8', // blue
      '#f5a031', // orange
      '#911EB4', // purple
      '#24caca', // cyan
      '#F032E6', // magenta
      '#64c027', // lime
      '#e49b9b', // pink
      '#006d80', // teal
      '#b86200', // brown
      '#c8b806', // beige
      '#800000', // maroon
      '#3eef73', // mint
      '#808000', // olive
      '#c36609', // coral
      '#000080', // navy
      '#808080', // grey
      '#103f39', // darker teal for replacement
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
