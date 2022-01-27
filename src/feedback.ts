import { Input } from './data'
import VMixInstance from './index'
import { options, volumeToLinear } from './utils'
import { IndicatorType } from './indicators'
import {
  CompanionFeedbackEvent,
  SomeCompanionInputField,
  CompanionBankRequiredProps,
  CompanionBankAdditionalStyleProps,
  CompanionFeedbackEventInfo,
  CompanionBankPNG,
} from '../../../instance_skel_types'

export interface VMixFeedbacks {
  // Tally
  inputPreview: VMixFeedback<InputPreviewCallback>
  inputLive: VMixFeedback<InputLiveCallback>
  overlayStatus: VMixFeedback<OverlayStatusCallback>

  // General
  videoTimer: VMixFeedback<VideoTimerCallback>
  status: VMixFeedback<StatusCallback>

  // Audio
  busMute: VMixFeedback<BusMuteCallback>
  busSolo: VMixFeedback<BusSoloCallback>
  inputAudio: VMixFeedback<InputAudioCallback>
  inputSolo: VMixFeedback<InputSoloCallback>
  inputBusRouting: VMixFeedback<InputBusRoutingCallback>
  liveBusVolume: VMixFeedback<LiveBusVolumeCallback>
  liveInputVolume: VMixFeedback<LiveInputVolumeCallback>
  busVolumeLevel: VMixFeedback<BusVolumeLevelCallback>
  inputVolumeLevel: VMixFeedback<InputVolumeLevelCallback>

  // Replay
  replayStatus: VMixFeedback<ReplayStatusCallback>
  replayEvents: VMixFeedback<ReplayEventsCallback>
  replayCamera: VMixFeedback<ReplayCameraCallback>
  replaySelectedChannel: VMixFeedback<ReplaySelectedChannelCallback>

  // Video Call
  videoCallAudioSource: VMixFeedback<VideoCallAudioSourceCallback>
  videoCallVideoSource: VMixFeedback<VideoCallVideoSourceCallback>

  // Slides / List
  inputSelectedIndex: VMixFeedback<InputSelectedIndexCallback>

  // Layers
  selectedDestinationInput: VMixFeedback<SelectedDestinationInputCallback>
  selectedDestinationLayer: VMixFeedback<SelectedDestinationLayerCallback>
  routableMultiviewLayer: VMixFeedback<RoutableMultiviewLayerCallback>
  inputOnMultiview: VMixFeedback<InputOnMultiviewCallback>

  // Util
  mixSelect: VMixFeedback<MixSelectCallback>
  buttonShift: VMixFeedback<ButtonShiftCallback>
  buttonText: VMixFeedback<ButtonTextCallback>

  // Index signature
  [key: string]: VMixFeedback<any>
}

// Tally
interface InputPreviewCallback {
  type: 'inputPreview'
  options: Readonly<{
    input: string
    mix: number
    fg: number
    bg: number
    tally: TallySelection
  }>
}

interface InputLiveCallback {
  type: 'inputLive'
  options: Readonly<{
    input: string
    mix: number
    fg: number
    bg: number
    tally: TallySelection
  }>
}

interface OverlayStatusCallback {
  type: 'overlayStatus'
  options: Readonly<{
    input: string
    overlay: string
    fg: number
    bgPreview: number
    bgProgram: number
  }>
}

// General
interface VideoTimerCallback {
  type: 'videoTimer'
  options: Readonly<{
    input: string
    color: number
    color30: number
    color10: number
    loop: boolean
  }>
}

interface StatusCallback {
  type: 'status'
  options: Readonly<{
    status:
      | 'connection'
      | 'fadeToBlack'
      | 'recording'
      | 'external'
      | 'streaming'
      | 'multiCorder'
      | 'fullscreen'
      | 'playList'
    fg: number
    bg: number
    value: '' | '0' | '1' | '2'
  }>
}

// Audio
interface BusMuteCallback {
  type: 'busMute'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface BusSoloCallback {
  type: 'busSolo'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface InputAudioCallback {
  type: 'inputAudio'
  options: Readonly<{
    input: string
    fg: number
    bgLive: number
    bgMuted: number
  }>
}

interface InputSoloCallback {
  type: 'inputSolo'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface InputBusRoutingCallback {
  type: 'inputBusRouting'
  options: Readonly<{
    input: string
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface LiveBusVolumeCallback {
  type: 'liveBusVolume'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    dBShow: boolean
    colorTxt: boolean
    colorBG: boolean
    colorBase: number
    color: number
    color1: number
    color6: number
    color18: number
    color36: number
  }>
}

interface LiveInputVolumeCallback {
  type: 'liveInputVolume'
  options: Readonly<{
    input: string
    dBShow: boolean
    colorTxt: boolean
    colorBG: boolean
    colorBase: number
    color: number
    color1: number
    color6: number
    color18: number
    color36: number
  }>
}

interface BusVolumeLevelCallback {
  type: 'busVolumeLevel'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Headphones'
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
    fg: number
    bg: number
  }>
}

interface InputVolumeLevelCallback {
  type: 'inputVolumeLevel'
  options: Readonly<{
    input: string
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
    fg: number
    bg: number
  }>
}

// Replay
interface ReplayStatusCallback {
  type: 'replayStatus'
  options: Readonly<{
    status: 'recording' | 'live'
    fg: number
    bg: number
  }>
}

interface ReplayEventsCallback {
  type: 'replayEvents'
  options: Readonly<{
    events: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
    fg: number
    bg: number
  }>
}

interface ReplayCameraCallback {
  type: 'replayCamera'
  options: Readonly<{
    channel: 'A' | 'B' | 'selected'
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    fg: number
    bg: number
  }>
}

interface ReplaySelectedChannelCallback {
  type: 'replaySelectedChannel'
  options: Readonly<{
    channel: 'AB' | 'A' | 'B'
    fg: number
    bg: number
  }>
}

// Video Call
interface VideoCallAudioSourceCallback {
  type: 'videoCallAudioSource'
  options: Readonly<{
    input: string
    source: 'Master' | 'Headphones' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface VideoCallVideoSourceCallback {
  type: 'videoCallVideoSource'
  options: Readonly<{
    input: string
    source: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
    fg: number
    bg: number
  }>
}

// Slides / List
interface InputSelectedIndexCallback {
  type: 'inputSelectedIndex'
  options: Readonly<{
    input: string
    selectedIndex: number
    fg: number
    bg: number
    et: number
    eb: number
  }>
}

// Layers
interface SelectedDestinationInputCallback {
  type: 'selectedDestinationInput'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface SelectedDestinationLayerCallback {
  type: 'selectedDestinationLayer'
  options: Readonly<{
    selectedIndex: string
    fg: number
    bg: number
  }>
}

interface RoutableMultiviewLayerCallback {
  type: 'routableMultiviewLaye'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface InputOnMultiviewCallback {
  type: 'inputOnMultiview'
  options: Readonly<{
    inputX: string
    inputY: string
    layer: number
    tally: TallySelection
    fg: number
    bg: number
  }>
}

// Util
interface MixSelectCallback {
  type: 'mixSelect'
  options: Readonly<{
    mix: 0 | 1 | 2 | 3
    fg: number
    bg: number
  }>
}

interface ButtonShiftCallback {
  type: 'buttonShift'
  options: Readonly<{
    fg: number
    bg: number
  }>
}

interface ButtonTextCallback {
  type: 'buttonText'
  options: Readonly<{
    text: string
  }>
}

// Callback type for Presets
export type FeedbackCallbacks =
  // Tally
  | InputPreviewCallback
  | InputLiveCallback
  | OverlayStatusCallback

  // General
  | VideoTimerCallback
  | StatusCallback

  // Audio
  | BusMuteCallback
  | BusSoloCallback
  | InputAudioCallback
  | InputSoloCallback
  | InputBusRoutingCallback
  | LiveBusVolumeCallback
  | LiveInputVolumeCallback
  | BusVolumeLevelCallback
  | InputVolumeLevelCallback

  // Replay
  | ReplayStatusCallback
  | ReplayEventsCallback
  | ReplayCameraCallback
  | ReplaySelectedChannelCallback

  // Video Call
  | VideoCallAudioSourceCallback
  | VideoCallVideoSourceCallback

  // Slides / List
  | InputSelectedIndexCallback

  // Layers
  | InputOnMultiviewCallback
  | SelectedDestinationInputCallback
  | SelectedDestinationLayerCallback
  | RoutableMultiviewLayerCallback

  // Util
  | MixSelectCallback
  | ButtonShiftCallback
  | ButtonTextCallback

type TallySelection = '' | 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR' | 'full'

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionInputField, 'default'> & { default: string | number | boolean | null }

// vMix Boolean and Advanced feedback types
interface VMixFeedbackBoolean<T> {
  type: 'boolean'
  label: string
  description: string
  style: Partial<CompanionBankRequiredProps & CompanionBankAdditionalStyleProps>
  options: InputFieldWithDefault[]
  callback?: (
    feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>,
    bank: Readonly<CompanionBankPNG | null>,
    info: Readonly<CompanionFeedbackEventInfo | null>
  ) => boolean
  subscribe?: (feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>) => boolean
  unsubscribe?: (feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>) => boolean
}

interface VMixFeedbackAdvanced<T> {
  type: 'advanced'
  label: string
  description: string
  options: InputFieldWithDefault[]
  callback?: (
    feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>,
    bank: Readonly<CompanionBankPNG | null>,
    info: Readonly<CompanionFeedbackEventInfo | null>
  ) => Partial<CompanionBankRequiredProps & CompanionBankAdditionalStyleProps> | void
  subscribe?: (
    feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>
  ) => Partial<CompanionBankRequiredProps & CompanionBankAdditionalStyleProps> | void
  unsubscribe?: (
    feedback: Readonly<Omit<CompanionFeedbackEvent, 'options' | 'type'> & T>
  ) => Partial<CompanionBankRequiredProps & CompanionBankAdditionalStyleProps> | void
}

export type VMixFeedback<T> = VMixFeedbackBoolean<T> | VMixFeedbackAdvanced<T>

export function getFeedbacks(instance: VMixInstance): VMixFeedbacks {
  return {
    // Tally
    inputPreview: {
      type: 'advanced',
      label: 'Tally - Preview state',
      description: 'Indicates if an input is in Preview (or is a layer of an input that is if layer tally is selected)',
      options: [
        options.input,
        options.mixSelect,
        options.foregroundColor,
        options.backgroundColorPreview,
        options.layerTallyIndicator,
      ],
      callback: (feedback, bank, info) => {
        let mix = feedback.options.mix

        if (mix === -1) mix = instance.routingData.mix

        // Check if an input is not in preview at all (0), currently in preview (1), or in preview as a layer (2)
        const checkInput = (input: Input | null): 0 | 1 | 2 => {
          if (
            input === null ||
            instance.data.mix[mix].preview === 0 ||
            !instance.data.inputs[instance.data.mix[mix].preview - 1]
          ) {
            return 0
          }

          if (input.key === instance.data.inputs[instance.data.mix[mix].preview - 1].key) {
            return 1
          } else if (feedback.options.tally !== '' && instance.data.mix[mix].previewTally.includes(input.key)) {
            return feedback.options.tally === 'full' ? 1 : 2
          } else {
            return 0
          }
        }

        const optionsInput = instance
          .parseOption(feedback.options.input)
          .map((value) => instance.data.getInput(value))
          .map(checkInput)

        if (
          optionsInput[instance.buttonShift.state] === 1 ||
          (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (optionsInput[instance.buttonShift.state] === 2 && bank && info) {
          return {
            img64: instance.indicator.getImage(
              feedback.options.tally as IndicatorType,
              feedback.options.bg,
              bank.bgcolor,
              info
            ),
          }
        } else {
          return
        }
      },
    },

    inputLive: {
      type: 'advanced',
      label: 'Tally - Program state',
      description: 'Indicates if an input is in Program (or is a layer of an input that is if layer tally is selected)',
      options: [
        options.input,
        options.mixSelect,
        options.foregroundColor,
        options.backgroundColorProgram,
        options.layerTallyIndicator,
      ],
      callback: (feedback, bank, info) => {
        let mix = feedback.options.mix

        if (mix === -1) mix = instance.routingData.mix

        // Check if an input is not in program at all (0), currently in program (1), or in program as a layer (2)
        const checkInput = (input: Input | null): 0 | 1 | 2 => {
          if (
            input === null ||
            instance.data.mix[mix].program === 0 ||
            !instance.data.inputs[instance.data.mix[mix].program - 1]
          ) {
            return 0
          }

          if (input.key === instance.data.inputs[instance.data.mix[mix].program - 1].key) {
            return 1
          } else if (feedback.options.tally !== '' && instance.data.mix[mix].programTally.includes(input.key)) {
            return feedback.options.tally === 'full' ? 1 : 2
          } else {
            return 0
          }
        }

        const optionsInput = instance
          .parseOption(feedback.options.input)
          .map((value) => instance.data.getInput(value))
          .map(checkInput)

        if (
          optionsInput[instance.buttonShift.state] === 1 ||
          (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (optionsInput[instance.buttonShift.state] === 2 && bank && info) {
          return {
            img64: instance.indicator.getImage(
              feedback.options.tally as IndicatorType,
              feedback.options.bg,
              bank.bgcolor,
              info
            ),
          }
        } else {
          return
        }
      },
    },

    overlayStatus: {
      type: 'advanced',
      label: 'Tally - Overlay state',
      description: 'Indicates if an input (or any if left blank) is previewed, or live, as an overlay',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Overlay',
          id: 'overlay',
          default: '1',
          choices: ['Any', '1', '2', '3', '4', 'Stinger 1', 'Stinger 2', 'Stinger 3', 'Stinger 4'].map((id, index) => ({
            id: index.toString(),
            label: id,
          })),
        },
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Preview Background Color',
          id: 'bgPreview',
          default: instance.rgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Program Background Color',
          id: 'bgProgram',
          default: instance.rgb(255, 0, 0),
        },
      ],
      callback: (feedback) => {
        const inputOptions = instance
          .parseOption(feedback.options.input)
          .map((value) => instance.data.getInput(value)?.number)

        let preview = false
        let program = false

        instance.data.overlays.forEach((overlay) => {
          const overlayNumberCheck =
            overlay.number === parseInt(feedback.options.overlay, 10) || feedback.options.overlay === '0'
          const overlayInputCheck =
            overlay.input === inputOptions[instance.buttonShift.state] ||
            (feedback.options.input === '' && overlay.input !== null)

          if (overlayNumberCheck && overlayInputCheck) {
            if (overlay.preview) {
              preview = true
            } else {
              program = true
            }
          }
        })

        if (preview || program) {
          return {
            color: feedback.options.fg,
            bgcolor: program ? feedback.options.bgProgram : feedback.options.bgPreview,
          }
        }

        return
      },
    },

    // General
    videoTimer: {
      type: 'advanced',
      label: 'Video - Video Timer',
      description: 'Time remaining on video input',
      options: [
        options.input,
        {
          type: 'colorpicker',
          label: 'Text color',
          id: 'color',
          default: instance.rgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color under 30s',
          id: 'color30',
          default: instance.rgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color under 10s',
          id: 'color10',
          default: instance.rgb(255, 0, 0),
        },
        {
          type: 'checkbox',
          label: 'Disable color change if looping',
          id: 'loop',
          default: false,
        },
      ],
      callback: (feedback, bank) => {
        const inputOption = instance.parseOption(feedback.options.input)[instance.buttonShift.state]
        const input = instance.data.getInput(inputOption)

        if (!input || input.duration === 0) {
          return
        }

        const outPosition = input.markOut ? input.markOut : input.duration

        const remaining = outPosition - input.position

        const ms = Math.floor((remaining % 1000) / 100)
        const sec = Math.floor((remaining % 60000) / 1000)
        const min = Math.floor(remaining / 60000)

        const color = () => {
          if (feedback.options.loop || min > 0 || sec > 30) {
            return feedback.options.color
          }
          if (sec > 10) {
            return feedback.options.color30
          }
          return feedback.options.color10
        }

        const getText = () => {
          return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.${ms}`
        }

        return { color: color(), text: (bank ? bank.text : '') + `${getText()}` }
      },
    },

    status: {
      type: 'advanced',
      label: 'vMix - status',
      description: 'Current status of vMix, such as recording, external, etc...',
      options: [
        {
          type: 'dropdown',
          label: 'Status Type',
          id: 'status',
          default: 'connection',
          choices: [
            'connection',
            'fadeToBlack',
            'recording',
            'external',
            'streaming',
            'multiCorder',
            'fullscreen',
            'playList',
          ].map((id) => ({ id, label: id })),
        },
        options.foregroundColor,
        options.backgroundColorProgram,
        {
          type: 'dropdown',
          label: 'Stream Feedback Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '0' },
            { id: '1', label: '1' },
            { id: '2', label: '2' },
          ],
        },
      ],
      callback: (feedback) => {
        if (feedback.options.status === 'connection') {
          if (instance.connected) return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else {
          if (instance.data.status !== undefined) {
            if (feedback.options.status === 'streaming') {
              const anyStream = feedback.options.value === '' && instance.data.status.stream.includes(true)
              const specificStream = instance.data.status.stream[parseInt(feedback.options.value, 10)]
              if (anyStream || specificStream) return { color: feedback.options.fg, bgcolor: feedback.options.bg }
            } else {
              if (instance.data.status[feedback.options.status])
                return { color: feedback.options.fg, bgcolor: feedback.options.bg }
            }
          }
        }
        return
      },
    },

    // Audio
    busMute: {
      type: 'advanced',
      label: 'Audio - Bus mute',
      description: 'Indicate if a bus is muted',
      options: [options.audioBusMaster, options.foregroundColor, options.backgroundColorProgram],
      callback: (feedback) => {
        const busID = feedback.options.bus === 'Master' ? 'master' : `bus${feedback.options.bus}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.muted ? { color: feedback.options.fg, bgcolor: feedback.options.bg } : undefined
      },
    },

    busSolo: {
      type: 'advanced',
      label: 'Audio - Bus solo',
      description: 'Requires vMix v25',
      options: [options.audioBus, options.foregroundColorBlack, options.backgroundColorYellow],
      callback: (feedback) => {
        const busID = `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.solo ? { color: feedback.options.fg, bgcolor: feedback.options.bg } : undefined
      },
    },

    inputAudio: {
      type: 'advanced',
      label: 'Audio - Input mute',
      description: 'Indicate if an input is muted or enabled',
      options: [
        options.input,
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Audio Live color',
          id: 'bgLive',
          default: instance.rgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Audio Muted color',
          id: 'bgMuted',
          default: instance.rgb(255, 0, 0),
        },
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(instance.parseOption(feedback.options.input)[instance.buttonShift.state])

        if (!input) {
          return
        }

        if (input.muted) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bgMuted }
        } else {
          return { color: feedback.options.fg, bgcolor: feedback.options.bgLive }
        }
      },
    },

    inputSolo: {
      type: 'advanced',
      label: 'Audio - Input solo',
      description: 'Indicate if an input is set to Solo',
      options: [options.input, options.foregroundColor, options.backgroundColorProgram],
      callback: (feedback) => {
        const input = instance.data.getInput(instance.parseOption(feedback.options.input)[instance.buttonShift.state])

        if (input?.solo) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    inputBusRouting: {
      type: 'advanced',
      label: 'Audio - Input Bus Routing',
      description: 'Indicate which busses an input will output to',
      options: [
        options.input,
        options.audioBusMaster,
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Background color',
          id: 'bg',
          default: instance.rgb(255, 255, 0),
        },
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(instance.parseOption(feedback.options.input)[instance.buttonShift.state])
        const busID = feedback.options.bus === 'Master' ? 'M' : feedback.options.bus

        if (input?.audioBusses?.[busID]) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    liveBusVolume: {
      type: 'advanced',
      label: 'Audio - Bus live dB value',
      description: 'Indicate what the live dB value on a bus is',
      options: [
        options.audioBusMaster,
        {
          type: 'checkbox',
          label: 'Show the actual dB value',
          id: 'dBShow',
          default: false,
        },
        {
          type: 'checkbox',
          label: 'Color Text',
          id: 'colorTxt',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Color Background',
          id: 'colorBG',
          default: false,
        },
        {
          type: 'colorpicker',
          label: 'Base Text Color',
          id: 'colorBase',
          default: instance.rgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: instance.rgb(255, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: instance.rgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: instance.rgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: instance.rgb(0, 192, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: instance.rgb(0, 128, 0),
        },
      ],
      callback: (feedback, bank) => {
        const busID = feedback.options.bus === 'Master' ? 'master' : 'bus' + feedback.options.bus
        const bus = instance.data.getAudioBus(busID)

        if (bus) {
          const dBLeft = (20 * Math.log(bus.meterF1)) / Math.LN10
          const dBRight = (20 * Math.log(bus.meterF2)) / Math.LN10

          const dB = +Math.max(dBLeft, dBRight).toFixed(1)

          const color = () => {
            if (dB > -1) {
              return feedback.options.color
            } else if (dB > -6) {
              return feedback.options.color1
            } else if (dB > -18) {
              return feedback.options.color6
            } else if (dB > -36) {
              return feedback.options.color18
            }
            return feedback.options.color36
          }

          let txt = ''
          const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
          const colorBg = feedback.options.colorBG ? color() : bank?.bgcolor || 0

          if (feedback.options.dBShow) {
            if (bank?.text != '') {
              txt = bank?.text + `\\n ${dB} dB`
            } else {
              txt = bank.text + `${dB} dB`
            }
          } else {
            txt = bank?.text || ''
          }

          return { color: colorFg, bgcolor: colorBg, text: txt }
        }

        return
      },
    },

    liveInputVolume: {
      type: 'advanced',
      label: 'Audio - Input live dB value',
      description: 'Indicate what the live dB value on an input is',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Show the actual dB Value',
          id: 'dBShow',
          default: false,
        },
        {
          type: 'checkbox',
          label: 'Color Text',
          id: 'colorTxt',
          default: true,
        },
        {
          type: 'checkbox',
          label: 'Color Background',
          id: 'colorBG',
          default: false,
        },
        {
          type: 'colorpicker',
          label: 'Basse Text Color',
          id: 'colorBase',
          default: instance.rgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: instance.rgb(255, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: instance.rgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: instance.rgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: instance.rgb(0, 192, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: instance.rgb(0, 128, 0),
        },
      ],
      callback: (feedback, bank) => {
        const input = instance.data.getInput(instance.parseOption(feedback.options.input)[instance.buttonShift.state])

        // Detect if there is sound enabled on an input
        if (!input?.meterF1 || !input?.meterF2) {
          return
        }

        const dBLeft = (20 * Math.log(input.meterF1)) / Math.LN10
        const dBRight = (20 * Math.log(input.meterF2)) / Math.LN10
        const dB = +Math.max(dBLeft, dBRight).toFixed(1)

        const color = () => {
          if (dB > -1) {
            return feedback.options.color
          } else if (dB > -6) {
            return feedback.options.color1
          } else if (dB > -18) {
            return feedback.options.color6
          } else if (dB > -36) {
            return feedback.options.color18
          }
          return feedback.options.color36
        }

        let txt = ''
        const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
        const colorBg = feedback.options.colorBG ? color() : bank?.bgcolor || 0

        if (feedback.options.dBShow) {
          txt = (bank?.text || '') + `${dB} dB`
        } else {
          txt = bank?.text || ''
        }

        return { color: colorFg, bgcolor: colorBg, text: txt }
      },
    },

    busVolumeLevel: {
      type: 'advanced',
      label: 'Audio - Bus Volume',
      description: 'Indicate if an output bus fader is within a set range',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: 'Master',
          choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Headphones'].map((id) => ({ id, label: id })),
        },
        options.comparison,
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          min: 0,
          max: 100,
          default: 100,
        },
        options.foregroundColor,
        options.backgroundColorPreview,
      ],
      callback: (feedback) => {
        let volume = 0

        if (feedback.options.bus === 'Headphones') {
          const bus = instance.data.audio.find((output) => output.bus === 'master')
          volume = instance.config.volumeLinear
            ? volumeToLinear(bus?.headphonesVolume || 0)
            : bus?.headphonesVolume || 0
        } else {
          const busID = feedback.options.bus === 'Master' ? 'master' : 'bus' + feedback.options.bus
          const bus = instance.data.getAudioBus(busID)
          volume = instance.config.volumeLinear ? volumeToLinear(bus?.volume || 0) : bus?.volume || 0
        }

        const volumeInRange = {
          eq: volume === feedback.options.value,
          lt: volume < feedback.options.value,
          lte: volume <= feedback.options.value,
          gt: volume > feedback.options.value,
          gte: volume >= feedback.options.value,
        }

        if (volumeInRange[feedback.options.comparison]) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    inputVolumeLevel: {
      type: 'advanced',
      label: 'Audio - Input Volume',
      description: 'Indicate if an input fader is in a set value',
      options: [
        options.input,
        options.comparison,
        {
          type: 'number',
          label: 'Value',
          id: 'value',
          min: 0,
          max: 100,
          default: 100,
        },
        options.foregroundColor,
        options.backgroundColorPreview,
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(feedback.options.input)

        if (input?.volume === undefined) {
          return
        }

        const volume = instance.config.volumeLinear ? volumeToLinear(input.volume) : input.volume

        const volumeInRange = {
          eq: volume === feedback.options.value,
          lt: volume < feedback.options.value,
          lte: volume <= feedback.options.value,
          gt: volume > feedback.options.value,
          gte: volume >= feedback.options.value,
        }

        if (volumeInRange[feedback.options.comparison]) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    // Replay
    replayStatus: {
      type: 'advanced',
      label: 'Replay - Recording/Live',
      description: 'Indicates current recording or live status of a replay input',
      options: [
        {
          type: 'dropdown',
          label: 'Type',
          id: 'status',
          default: 'recording',
          choices: [
            { id: 'recording', label: 'Recording' },
            { id: 'live', label: 'Live' },
          ],
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        if (instance.data.replay[feedback.options.status]) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    replayEvents: {
      type: 'advanced',
      label: 'Replay - Events Tab',
      description: 'Indicates currently selected Events tab',
      options: [
        {
          type: 'dropdown',
          label: 'Events',
          id: 'events',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => ({
            id: id,
            label: id.toString(),
          })),
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        if (instance.data.replay.events === feedback.options.events) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    replayCamera: {
      type: 'advanced',
      label: 'Replay - Camera Live',
      description: 'Indicates current replay camera being live on a channel',
      options: [
        {
          type: 'dropdown',
          label: 'Replay Channel',
          id: 'channel',
          default: 'A',
          choices: [
            { id: 'A', label: 'Replay A' },
            { id: 'B', label: 'Replay B' },
            { id: 'selected', label: 'Replay Selected' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Camera',
          id: 'camera',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({ id, label: id.toString() })),
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        let channel: 'A' | 'B' | 'selected' = feedback.options.channel

        if (channel === 'selected') {
          // Backways compatibility - Default to channel A if prior to v24
          channel =
            !instance.data.replay.channelMode || instance.data.replay.channelMode === 'AB'
              ? 'A'
              : instance.data.replay.channelMode
        }

        const cameraChannel = ('camera' + channel) as 'cameraA' | 'cameraB'

        if (instance.data.replay[cameraChannel] == feedback.options.camera) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    replaySelectedChannel: {
      type: 'advanced',
      label: 'Replay - Selected Channel',
      description: 'Indicates currently selected channel',
      options: [
        {
          type: 'dropdown',
          label: 'Replay Channel',
          id: 'channel',
          default: 'AB',
          choices: [
            { id: 'AB', label: 'A|B' },
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
          ],
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        if (instance.data.replay.channelMode && instance.data.replay.channelMode === feedback.options.channel) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    // Video Call
    videoCallAudioSource: {
      type: 'advanced',
      label: 'Video Call - Audio Source',
      description: 'Indicates audio source for a video call',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Master',
          choices: ['Master', 'Headphones', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id, index) => ({
            id: index > 1 ? `Bus${id}` : id,
            label: id,
          })),
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(feedback.options.input)

        if (input?.callAudioSource === feedback.options.source) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    videoCallVideoSource: {
      type: 'advanced',
      label: 'Video Call - Video Source',
      description: 'Indicates video source for a video call',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Output1',
          choices: ['Output1', 'Output2', 'Output3', 'Output4', 'None'].map((id) => ({ id, label: id })),
        },
        options.foregroundColor,
        options.backgroundColorProgram,
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(feedback.options.input)

        if (input?.callVideoSource === feedback.options.source) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    // Slides / List
    inputSelectedIndex: {
      type: 'advanced',
      label: 'Slides/List - Change Colors Based On Selected Slide/Index',
      description: 'If the specified slide/index is selected, change colors of the bank',
      options: [
        options.input,
        options.selectedIndex,
        options.foregroundColor,
        options.backgroundColorProgram,
        {
          type: 'colorpicker',
          label: 'Empty List Warning Text',
          id: 'et',
          default: instance.rgb(0, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Empty List Warning Background',
          id: 'eb',
          default: instance.rgb(255, 255, 0),
        },
      ],
      callback: (feedback) => {
        const input = instance.data.getInput(feedback.options.input)

        if (input?.type === 'VideoList') {
          if (input.selectedIndex === feedback.options.selectedIndex) {
            return { color: feedback.options.fg, bgcolor: feedback.options.bg }
          } else if (input?.list?.length === 0) {
            return { color: feedback.options.et, bgcolor: feedback.options.eb }
          }
        } else if (input?.type === 'PowerPoint') {
          if (input.selectedIndex === feedback.options.selectedIndex) {
            return { color: feedback.options.fg, bgcolor: feedback.options.bg }
          }
        }

        return
      },
    },

    // Layers
    selectedDestinationInput: {
      type: 'advanced',
      label: 'Layers - Destination Input Indicator',
      description: 'Indicates if input is currently selected for Layer Routing',
      options: [options.input, options.foregroundColorBlack, options.backgroundColorYellow],
      callback: (feedback) => {
        if (instance.routingData.layer.destinationInput === null) return

        const selectInput = instance.data.getInput(instance.routingData.layer.destinationInput)?.key || ''
        const getInputValue = instance
          .parseOption(feedback.options.input)
          .map((input) => instance.data.getInput(input)?.key || null)

        if (
          getInputValue[instance.buttonShift.state] === selectInput ||
          (instance.buttonShift.blink && instance.config.shiftBlinkLayerRouting && getInputValue.includes(selectInput))
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    selectedDestinationLayer: {
      type: 'advanced',
      label: 'Layers - Destination Layer Indicator',
      description: 'Indicates if layer is currently selected for Layer Routing',
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer of destination Input',
          id: 'selectedIndex',
          default: '',
        },
        options.foregroundColorBlack,
        options.backgroundColorYellow,
      ],
      callback: (feedback) => {
        //const getIndexValue = parseOption(feedback.options.selectedIndex) as string;
        const getIndexValue = instance.parseOption(feedback.options.selectedIndex)
        let blink = false
        if (
          instance.routingData.layer.destinationLayer !== null &&
          instance.buttonShift.blink &&
          instance.config.shiftBlinkLayerRouting &&
          getIndexValue.includes(instance.routingData.layer.destinationLayer)
        ) {
          blink = true
        }

        if (getIndexValue[instance.buttonShift.state] === instance.routingData.layer.destinationLayer || blink) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    routableMultiviewLayer: {
      type: 'advanced',
      label: 'Layers - check if input is on destination Layer of destination input',
      description: '',
      options: [options.input, options.foregroundColor, options.backgroundColorYellow],
      callback: (feedback) => {
        const getInputValue = instance
          .parseOption(feedback.options.input)
          .map((input) => instance.data.getInput(input)?.key || null)

        if (
          getInputValue[instance.buttonShift.state] === null ||
          instance.routingData.layer.destinationInput === null ||
          instance.routingData.layer.destinationLayer === null
        )
          return

        const selectedInput = instance.data.getInput(instance.routingData.layer.destinationInput)
        const index = parseInt(instance.routingData.layer.destinationLayer) - 1

        if (selectedInput !== null && selectedInput.overlay) {
          const selectedLayer = selectedInput.overlay.find((overlay) => overlay.index === index)

          let blink = false
          if (
            selectedLayer?.key &&
            instance.buttonShift.blink &&
            instance.config.shiftBlinkLayerRouting &&
            getInputValue.includes(selectedLayer.key)
          ) {
            blink = true
          }

          if (selectedLayer?.key === getInputValue[instance.buttonShift.state] || blink) {
            return { color: feedback.options.fg, bgcolor: feedback.options.bg }
          }
        }

        return
      },
    },

    inputOnMultiview: {
      type: 'advanced',
      label: 'Layers - check if X input is on Layer on Y input',
      description: '',
      options: [
        {
          type: 'textinput',
          label: 'Input X',
          id: 'inputX',
          default: '1',
          tooltip: 'Number, Name, or GUID',
        },
        {
          type: 'textinput',
          label: 'Input Y',
          id: 'inputY',
          default: '1',
          tooltip: 'Number, Name, or GUID',
        },
        {
          type: 'number',
          label: 'Layer ',
          id: 'layer',
          default: 0,
          min: 0,
          max: 10,
          tooltip: '1-10, 0 = Any layer',
        },
        options.foregroundColor,
        options.backgroundColorYellow,
      ],
      callback: (feedback) => {
        const inputXValue = instance
          .parseOption(feedback.options.inputX)
          .map((input) => instance.data.getInput(input)?.key || null)

        const inputYValue = instance.parseOption(feedback.options.inputY).map((input) => instance.data.getInput(input))

        const check = (state: number): boolean => {
          if (feedback.options.layer === 0) {
            return inputYValue[state]?.overlay?.find((layer) => layer.key === inputXValue[state]) !== undefined
          } else {
            return inputYValue[state]?.overlay?.[feedback.options.layer - 1]?.key === inputXValue[state]
          }
        }

        const primaryCheck = check(instance.buttonShift.state)
        const secondaryCheck = inputYValue.map((input, index) => {
          if (input !== null && inputXValue[index] !== null) {
            return check(index)
          } else {
            return false
          }
        })

        if (
          primaryCheck ||
          (secondaryCheck.includes(true) && instance.config.shiftBlinkLayerRouting && instance.buttonShift.blink)
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    // Util
    mixSelect: {
      type: 'advanced',
      label: 'Util - Mix Selected',
      description: '',
      options: [
        {
          type: 'dropdown',
          label: 'Mix',
          id: 'mix',
          default: 0,
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
          ],
        },
        options.foregroundColor,
        options.backgroundColorYellow,
      ],
      callback: (feedback) => {
        if (instance.routingData.mix === feedback.options.mix) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    buttonShift: {
      type: 'advanced',
      label: 'Util - Button Shift state',
      description: '',
      options: [options.foregroundColorBlack, options.backgroundColorYellow],
      callback: (feedback) => {
        if (instance.buttonShift.state !== 0) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return
      },
    },

    buttonText: {
      type: 'advanced',
      label: 'Util - Shift text',
      description: '',
      options: [
        {
          type: 'textinput',
          label: 'Text',
          id: 'text',
          default: instance.config.shiftDelimiter,
        },
      ],
      callback: (feedback, bank) => {
        const textSplit = instance.parseOption(feedback.options.text)[instance.buttonShift.state]

        return { text: (bank?.text || '') + (textSplit || '') }
      },
    },
  }
}
