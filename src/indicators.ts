import { CompanionFeedbackEventInfo } from '../../../instance_skel_types'

interface IndicatorImages {
  [key: string]: string
}

export interface CornerPosition {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

export type IndicatorType = 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR'

// Cache of indicators
const indicatorImages: IndicatorImages = {}

export class Indicator {
  private readonly instance: any
  private settings = {
    borderDepth: 3,
    triangleDepth: 20,
    stale: true,
  }

  constructor(instance: any) {
    this.instance = instance
  }

  /**
   * @param type indicator style
   * @param color forground color
   * @param bgColor background color
   * @param info feedback info object for button width and height
   * @returns base64 encoded image
   * @description generates border or corner indicators
   */
  public readonly getImage = (
    type: IndicatorType,
    color: number,
    bgColor = 0,
    info: CompanionFeedbackEventInfo
  ): string => {
    const img = new this.instance.Image(info.width, info.height)
    img.backgroundColor(bgColor)

    const id = `${type}-${info.width}-${info.height}-${color}-${bgColor}`

    // Use cached indicator if available
    if (indicatorImages[id]) {
      return indicatorImages[id]
    } else {
      if (type === 'border') {
        img.drawBorder(this.settings.borderDepth, color)
      } else if (type === 'cornerTL') {
        img.drawCornerTriangle(this.settings.triangleDepth, color, 'left', 'top')
      } else if (type === 'cornerTR') {
        img.drawCornerTriangle(this.settings.triangleDepth, color, 'right', 'top')
      } else if (type === 'cornerBL') {
        img.drawCornerTriangle(this.settings.triangleDepth, color, 'left', 'bottom')
      } else if (type === 'cornerBR') {
        img.drawCornerTriangle(this.settings.triangleDepth, color, 'right', 'bottom')
      }

      indicatorImages[id] = img.toBase64()

      return indicatorImages[id]
    }
  }
}
