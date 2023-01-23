export type IndicatorType = '' | 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR' | 'full'

export class Indicator {
  /**
   * @param width bank width
   * @param height bank height
   * @param color RGB number
   * @param type Indicator type
   * @returns ARGB buffer for the button image
   * @description Generates a border, or corner indicator, for feedback of an input that's in preview/program as a layer
   */
  public readonly drawIndicator = (
    width: number,
    height: number,
    color: number,
    type: IndicatorType
  ): Uint8Array | string => {
    if (type === '' || type === 'full') return ''
    if (width <= 5 || width > 72 || height <= 5 || height > 72) throw new Error('Depth out of range')
    const buffer = Buffer.alloc(width * height * 4)
    color = color + 0xff000000

    const borderThickness = 4

    if (type === 'border') {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const innerRect =
            x > borderThickness && x < width - borderThickness && y > borderThickness && y < height - borderThickness
          if (!innerRect) {
            const index = y * width + x
            buffer.writeUint32BE(color, index * 4)
          }
        }
      }
    } else {
      const hAlign = type.endsWith('R') ? 'right' : 'left'
      const vAlign = type.includes('T') ? 'top' : 'bottom'

      for (let y = 0; y < height * 0.33; y++) {
        const trueY = vAlign == 'bottom' ? height - 1 - y : y
        for (let x = 0; x < width * 0.33 - y; x++) {
          const trueX = hAlign == 'right' ? width - 1 - x : x

          const index = trueY * width + trueX
          buffer.writeUint32BE(color, index * 4)
        }
      }
    }

    return buffer
  }
}
