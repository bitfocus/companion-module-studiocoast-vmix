import {
  CompanionInputFieldColor,
  CompanionInputFieldDropdown,
  CompanionInputFieldNumber,
  CompanionInputFieldTextInput,
} from '../../../instance_skel_types'

type TimeFormat = 'hh:mm:ss' | 'hh:mm:ss.ms' | 'mm:ss' | 'mm:ss.ms'

interface NumericDropdownChoice {
  id: number
  label: string
}

interface NumericInputFieldDropown extends Exclude<CompanionInputFieldDropdown, 'choices'> {
  choices: NumericDropdownChoice[]
}

// Force options to have a default to prevent sending undefined values
type EnforceDefault<T, U> = Omit<T, 'default'> & { default: U }

export interface Options {
  input: EnforceDefault<CompanionInputFieldTextInput, string>
  mixSelect: EnforceDefault<NumericInputFieldDropown, number>
  audioBus: EnforceDefault<CompanionInputFieldDropdown, string>
  audioBusMaster: EnforceDefault<CompanionInputFieldDropdown, string>
  foregroundColor: EnforceDefault<CompanionInputFieldColor, number>
  foregroundColorBlack: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorPreview: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorProgram: EnforceDefault<CompanionInputFieldColor, number>
  backgroundColorYellow: EnforceDefault<CompanionInputFieldColor, number>
  selectedIndex: EnforceDefault<CompanionInputFieldNumber, number>
  comparison: EnforceDefault<CompanionInputFieldDropdown, string>
  layerTallyIndicator: EnforceDefault<CompanionInputFieldDropdown, string>
  replayChannel: EnforceDefault<CompanionInputFieldDropdown, string>
}

// Static Variables
export const AUDIOBUSSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const
export const AUDIOBUSSESMASTER = ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const

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
] as const

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
      { id: -1, label: 'Selected' },
    ],
  },

  audioBus: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'A',
    choices: AUDIOBUSSES.map((id) => ({ id, label: id })),
  },

  audioBusMaster: {
    type: 'dropdown',
    label: 'Bus',
    id: 'value',
    default: 'Master',
    choices: ['Master', ...AUDIOBUSSES].map((id) => ({ id, label: id })),
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
    type: 'number',
    label: 'Selected Index',
    id: 'selectedIndex',
    default: 1,
    min: 1,
    max: 9999,
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
  return Math.round(Math.pow(volume / 100, 0.25) * 100)
}

/**
 * @param time Time in miliseconds or seconds
 * @param interval Interval of the time value - 'ms' or 's'
 * @param format String formatting - 'hh:mm:ss', 'hh:mm:ss.ms', 'mm:ss', or 'mm:ss.ms'
 * @returns Formated time string
 */
export const formatTime = (time: number, interval: 'ms' | 's', format: TimeFormat): string => {
  const timeMS = time * (interval === 'ms' ? 1 : 1000)
  const padding = (value: number): string => (value < 10 ? '0' + value : value.toString())

  const hh = padding(Math.floor(timeMS / 360000))
  const mm = padding(Math.floor(timeMS / 60000) % 60)
  const ss = padding(Math.floor(timeMS / 1000) % 60)
  const ms = (timeMS % 1000) / 100

  const result = `${format.includes('hh') ? `${hh}:` : ''}${mm}:${ss}${format.includes('ms') ? `.${ms}` : ''}`
  return result
}
