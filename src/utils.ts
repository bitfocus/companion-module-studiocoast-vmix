import type { CompanionInputFieldColor, CompanionInputFieldDropdown, CompanionInputFieldTextInput } from '@companion-module/base'
import type { Input } from './data'

export type TimeFormat = 'hh:mm:ss' | 'hh:mm:ss.ms' | 'mm:ss' | 'mm:ss.ms' | 'mm:ss.sss' | 'auto'

interface NumericDropdownChoice {
  id: number
  label: string
}

interface NumericInputFieldDropdown extends Exclude<CompanionInputFieldDropdown, 'choices'> {
  choices: NumericDropdownChoice[]
}

// Force options to have a default to prevent sending undefined values
type EnforceDefault<T, U> = Omit<T, 'default'> & { default: U }

export interface Options {
  input: EnforceDefault<CompanionInputFieldTextInput, string>
  mixSelect: EnforceDefault<NumericInputFieldDropdown, number>
  mixVariable: EnforceDefault<CompanionInputFieldTextInput, string>
  audioBus: EnforceDefault<CompanionInputFieldDropdown, string>
  audioBusMaster: EnforceDefault<CompanionInputFieldDropdown, string>
  audioBusMasterHeadphones: EnforceDefault<CompanionInputFieldDropdown, string>
  foregroundColor: EnforceDefault<CompanionInputFieldColor, number>
  foregroundColorBlack: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorPreview: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorProgram: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorYellow: EnforceDefault<CompanionInputFieldColor, number>
  selectedIndex: EnforceDefault<CompanionInputFieldTextInput, string>
  comparison: EnforceDefault<CompanionInputFieldDropdown, string>
  layerTallyIndicator: EnforceDefault<CompanionInputFieldDropdown, string>
  replayChannel: EnforceDefault<CompanionInputFieldDropdown, string>
  adjustment: EnforceDefault<CompanionInputFieldDropdown, string>
}

export type AudioBusOption = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
export type AudioBusMasterOption = 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
export type AudioBusMasterHeadphonesOption = 'Master' | 'Headphones' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
export type MixOptionEntry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -1 | -2
export type EmptyOptions = Record<string, never>

// Static Variables
export const AUDIOBUSSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const
export const AUDIOBUSSESMASTER = ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const

export const TITLEANIMATIONPAGE = [
  'TransitionIn',
  'TransitionOut',
  'Page1',
  'Page2',
  'Page3',
  'Page4',
  'Page5',
  'Page6',
  'Page7',
  'Page8',
  'Page9',
  'Page10',
  'Continuous',
  'DataChangeIn',
  'DataChangeOut',
]

export const TRANSITIONS = [
  'Cut',
  'Fade',
  'Zoom',
  'Wipe',
  'Slide',
  'Fly',
  'CrossZoom',
  'FlyRotate',
  'Cube',
  'CubeZoom',
  'VerticalWipe',
  'VerticalSlide',
  'Merge',
  'WipeReverse',
  'SlideReverse',
  'VerticalWipeReverse',
  'VerticalSlideReverse',
  'BarnDoor',
  'RollerDoor',
  'AlphaFade',
] as const

export const calcDuration = (input: Input): { ms: string; ss: string; ssms: string; mmss: string; mmssms: string } | null => {
  if (input.duration > 1) {
    const inPosition = input.markIn ? input.markIn : 0
    const outPosition = input.markOut ? input.markOut : input.duration
    const duration = outPosition - inPosition
    const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

    const mm = (time: number): string => padding(Math.floor(time / 60000))
    const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
    const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

    return {
      ms: duration.toString(),
      ss: `${padding(Math.floor(duration / 1000))}`,
      ssms: `${padding(Math.floor(duration / 1000))}.${ms(duration)}`,
      mmss: `${mm(duration)}:${ss(duration)}`,
      mmssms: `${mm(duration)}:${ss(duration)}.${ms(duration)}`,
    }
  }

  return null
}

export const calcRemaining = (input: Input): { ms: string; ss: string; ssms: string; mmss: string; mmssms: string } | null => {
  if (input.position !== undefined) {
    const inPosition = input.position
    const outPosition = input.markOut ? input.markOut : input.duration
    const duration = outPosition - inPosition
    const padding = (time: number): string => (time < 10 ? '0' + time : time + '')

    const mm = (time: number): string => padding(Math.floor(time / 60000))
    const ss = (time: number): string => padding(Math.floor(time / 1000) % 60)
    const ms = (time: number): string => Math.floor((time / 100) % 10) + ''

    return {
      ms: duration.toString(),
      ss: `${padding(Math.floor(duration / 1000))}`,
      ssms: `${padding(Math.floor(duration / 1000))}.${ms(duration)}`,
      mmss: `${mm(duration)}:${ss(duration)}`,
      mmssms: `${mm(duration)}:${ss(duration)}.${ms(duration)}`,
    }
  }
  return null
}

/**
 * @param red 0-255
 * @param green 0-255
 * @param blue 0-255
 * @returns RGB value encoded for Companion Bank styling
 */
export const rgb = (red: number, green: number, blue: number): number => {
  return ((red & 0xff) << 16) | ((green & 0xff) << 8) | (blue & 0xff)
}

/**
 * @description Common Action and Feedback options
 */
export const options: Options = {
  input: {
    type: 'textinput',
    label: 'Input',
    id: 'input',
    default: '1',
    tooltip: 'Number, Name, or GUID',
    useVariables: { local: true },
  },

  mixSelect: {
    type: 'dropdown',
    label: 'Mix',
    id: 'mix',
    default: 0,
    choices: [
      { id: 0, label: '1' },
      { id: 1, label: '2' },
      { id: 2, label: '3' },
      { id: 3, label: '4' },
      { id: 4, label: '5' },
      { id: 5, label: '6' },
      { id: 6, label: '7' },
      { id: 7, label: '8' },
      { id: 8, label: '9' },
      { id: 9, label: '10' },
      { id: 10, label: '11' },
      { id: 11, label: '12' },
      { id: 12, label: '13' },
      { id: 13, label: '14' },
      { id: 14, label: '15' },
      { id: 15, label: '16' },
      { id: -1, label: 'Selected' },
      { id: -2, label: 'Variable' },
    ],
  },

  mixVariable: {
    type: 'textinput',
    label: 'Mix Variable',
    id: 'mixVariable',
    default: '1',
    tooltip: '',
    isVisible: (options) => options.mix === -2,
    useVariables: { local: true },
  },

  audioBus: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'A',
    choices: [...AUDIOBUSSES, 'Selected'].map((id) => ({ id, label: id })),
  },

  audioBusMaster: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'Master',
    choices: ['Master', ...AUDIOBUSSES, 'Selected'].map((id) => ({ id, label: id })),
  },

  audioBusMasterHeadphones: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'Master',
    choices: [...AUDIOBUSSESMASTER, 'Selected'].map((id) => ({ id, label: id })),
  },

  foregroundColor: {
    type: 'colorpicker',
    label: 'Foreground color',
    id: 'fg',
    default: rgb(255, 255, 255),
  },

  foregroundColorBlack: {
    type: 'colorpicker',
    label: 'Foreground color',
    id: 'fg',
    default: rgb(0, 0, 0),
  },

  backgroundColorPreview: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: rgb(0, 255, 0),
  },

  backgroundColorProgram: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: rgb(255, 0, 0),
  },

  backgroundColorYellow: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: rgb(255, 255, 0),
  },

  selectedIndex: {
    type: 'textinput',
    label: 'Selected Index',
    id: 'selectedIndex',
    default: '1',
    useVariables: { local: true },
  },

  comparison: {
    type: 'dropdown',
    label: 'Comparison',
    id: 'comparison',
    default: 'eq',
    choices: [
      { id: 'eq', label: '=' },
      { id: 'lt', label: '<' },
      { id: 'lte', label: '<=' },
      { id: 'gt', label: '>' },
      { id: 'gte', label: '>=' },
    ],
  },

  layerTallyIndicator: {
    type: 'dropdown',
    label: 'Layer Tally Indicator',
    id: 'tally',
    default: '',
    choices: [
      { id: '', label: 'None' },
      { id: 'border', label: 'Border' },
      { id: 'cornerTL', label: 'Corner Top Left' },
      { id: 'cornerTR', label: 'Corner Top Right' },
      { id: 'cornerBL', label: 'Corner Bottom Left' },
      { id: 'cornerBR', label: 'Corner Bottom Right' },
      { id: 'full', label: 'Full Background' },
    ],
  },

  replayChannel: {
    type: 'dropdown',
    label: 'Replay Channel',
    id: 'channel',
    default: 'Current',
    choices: [
      { id: 'Current', label: 'Current' },
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
    ],
  },

  adjustment: {
    type: 'dropdown',
    label: 'Adjustment',
    id: 'adjustment',
    default: 'Set',
    choices: [
      { id: 'Set', label: 'Set' },
      { id: 'Increase', label: 'Increase' },
      { id: 'Decrease', label: 'Decrease' },
    ],
  },
}

/**
 * @param volume Amplitude
 * @returns volume dB
 * @description Returns dB of a given volume (if the volume of a meter, multiply by 100 first)
 */
export const volumeTodB = (volume: number): number => {
  return 20 * Math.log10(volume / 100)
}

/**
 * @param volume Amplitude
 * @returns Linear volume
 * @description Returns volume as specified here https://www.vmix.com/knowledgebase/article.aspx/144/vmix-api-audio-levels
 */
export const volumeToLinear = (volume: number): number => {
  return Math.pow(volume / 100, 0.25) * 100
}

/**
 * @param time Time in milliseconds or seconds
 * @param interval Interval of the time value - 'ms' or 's'
 * @param format String formatting - 'hh:mm:ss', 'hh:mm:ss.ms', 'mm:ss', or 'mm:ss.ms'
 * @returns Formatted time string
 */
export const formatTime = (time: number, interval: 'ms' | 's', format: TimeFormat): string => {
  const timeMS = time * (interval === 'ms' ? 1 : 1000)
  const padding = (value: number): string => (value < 10 ? '0' + value : value.toString())

  const hh = padding(Math.floor(timeMS / 3600000))
  const mm = padding(Math.floor(timeMS / 60000) % 60)
  const ss = padding(Math.floor(timeMS / 1000) % 60)
  const ms = Math.floor((timeMS % 1000) / 100)
  let sss: string | number = timeMS % 1000
  if (sss < 10) {
    sss = '00' + sss
  } else if (sss < 100) {
    sss = '0' + sss
  }

  if (format === 'auto') {
    return `${hh !== '00' ? hh + ':' : ''}${mm !== '00' || hh !== '00' ? mm + ':' : ''}${ss}`
  } else {
    return `${format.includes('hh') ? `${hh}:` : ''}${mm}:${ss}${format.includes('ms') ? `.${ms}` : ''}${format.includes('sss') ? `.${sss}` : ''}`
  }
}

/**
 * @param value time in hh:mm:ss or hh:mm:ss.SSS format
 * @returns time in ms or null if not parseable
 * @description parses time string
 */
export const parseTime = (value: string): number | null => {
  const timeSplit = value.split(':')
  if (timeSplit.length !== 3) return null

  const hh = parseFloat(timeSplit[0])
  const mm = parseFloat(timeSplit[1])
  const ss = parseFloat(timeSplit[2])

  const ms = ss * 1000 + mm * 60 * 1000 + hh * 60 * 60 * 1000

  return ms
}

/**
 * @param value current value
 * @param min minimum value
 * @param max maximum value
 * @returns value adjusted to within min/max range
 * @description adjusts a value to ensure it is within min and max bounds
 */
export const valueMinMax = (value: number, min: number, max: number): number => {
  let adjustedValue = value
  if (adjustedValue > max) adjustedValue = max
  if (adjustedValue < min) adjustedValue = min
  return adjustedValue
}
