import type { CompanionInputFieldColor, CompanionInputFieldDropdown, CompanionInputFieldTextInput } from '@companion-module/base'
import type { ActionsSchema } from './actions/actions.js'
import type { FeedbacksSchema } from './feedbacks/feedback.js'
import type { VariablesSchema } from './variables/variables.js'
import type { Config } from './config.js'
import type { Input } from './data.js'

export interface VMixInstanceTypes {
  config: Config
  secrets: undefined
  actions: ActionsSchema
  feedbacks: FeedbacksSchema
  variables: VariablesSchema
}

export type TimeFormat = 'hh:mm:ss' | 'hh:mm:ss.ms' | 'mm:ss' | 'mm:ss.ms' | 'mm:ss.sss' | 'auto'

export interface Options {
  input: CompanionInputFieldTextInput<'input'>
  mixSelect: CompanionInputFieldDropdown<'mix'>
  audioBus: CompanionInputFieldDropdown<'value'>
  audioBusMaster: CompanionInputFieldDropdown<'value'>
  audioBusMasterHeadphones: CompanionInputFieldDropdown<'value'>
  foregroundColor: CompanionInputFieldColor<'fg'>
  foregroundColorBlack: CompanionInputFieldColor<'fg'>
  backgroundColorPreview: CompanionInputFieldColor<'bg'>
  backgroundColorProgram: CompanionInputFieldColor<'bg'>
  backgroundColorYellow: CompanionInputFieldColor<'bg'>
  selectedIndex: CompanionInputFieldTextInput<'selectedIndex'>
  comparison: CompanionInputFieldDropdown<'comparison'>
  layerTallyIndicator: CompanionInputFieldDropdown<'tally'>
  replayChannel: CompanionInputFieldDropdown<'channel'>
  adjustment: CompanionInputFieldDropdown<'adjustment'>
}

export type AudioBusOption = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
export type AudioBusMasterOption = 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
export type AudioBusMasterHeadphonesOption = 'Master' | 'Headphones' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
//export type MixOptionEntry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -1 | -2
export type MixOptionEntry = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 'Selected'
export type EmptyOptions = { options: Record<string, never> }

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
 * @description Common Action and Feedback options
 */
export const options: Options = {
  input: {
    type: 'textinput',
    label: 'Input',
    id: 'input',
    default: '1',
    description: 'Number, Name, or GUID',
    useVariables: true,
  },

  mixSelect: {
    type: 'dropdown',
    label: 'Mix',
    id: 'mix',
    default: 1,
    choices: [
      { id: 1, label: '1' },
      { id: 2, label: '2' },
      { id: 3, label: '3' },
      { id: 4, label: '4' },
      { id: 5, label: '5' },
      { id: 6, label: '6' },
      { id: 7, label: '7' },
      { id: 8, label: '8' },
      { id: 9, label: '9' },
      { id: 10, label: '10' },
      { id: 11, label: '11' },
      { id: 12, label: '12' },
      { id: 13, label: '13' },
      { id: 14, label: '14' },
      { id: 15, label: '15' },
      { id: 16, label: '16' },
      { id: 'Selected', label: 'Selected' },
    ],
    expressionDescription: `Valid Values: 1 to 16 or 'Selected'`,
  },

  audioBus: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'A',
    choices: [...AUDIOBUSSES, 'Selected'].map((id) => ({ id, label: id })),
    expressionDescription: `Valid Values: ${AUDIOBUSSES.map((bus) => `'${bus}'`).join(', ')}`,
  },

  audioBusMaster: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'Master',
    choices: ['Master', ...AUDIOBUSSES, 'Selected'].map((id) => ({ id, label: id })),
    expressionDescription: `Valid Values: 'Master', ${AUDIOBUSSES.map((bus) => `'${bus}'`).join(', ')}`,
  },

  audioBusMasterHeadphones: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'Master',
    choices: [...AUDIOBUSSESMASTER, 'Selected'].map((id) => ({ id, label: id })),
    expressionDescription: `Valid Values: ${AUDIOBUSSESMASTER.map((bus) => `'${bus}'`).join(', ')}`,
  },

  foregroundColor: {
    type: 'colorpicker',
    label: 'Foreground color',
    id: 'fg',
    default: 0xffffff,
  },

  foregroundColorBlack: {
    type: 'colorpicker',
    label: 'Foreground color',
    id: 'fg',
    default: 0x000000,
  },

  backgroundColorPreview: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: 0x00ff00,
  },

  backgroundColorProgram: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: 0xff0000,
  },

  backgroundColorYellow: {
    type: 'colorpicker',
    label: 'Background color',
    id: 'bg',
    default: 0xffff00,
  },

  selectedIndex: {
    type: 'textinput',
    label: 'Selected Index',
    id: 'selectedIndex',
    default: '1',
    useVariables: true,
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
    expressionDescription: `Valid Values: 'Current', 'A', 'B'`,
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
    expressionDescription: `Valid Values: 'Set', 'Increase', 'Decrease'`,
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

export const parseMix = (value: string | number): number | null => {
  const mix = typeof value === 'string' ? parseInt(value) : value
  return isNaN(mix) ? null : mix - 1
}
