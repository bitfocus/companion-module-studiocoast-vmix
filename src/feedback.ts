import { Input } from './data'
import VMixInstance from './index'
import { AUDIOBUSSES, options, volumeToLinear } from './utils'
import {
  combineRgb,
  CompanionAdvancedFeedbackResult,
  CompanionFeedbackButtonStyleResult,
  CompanionFeedbackAdvancedEvent,
  CompanionFeedbackBooleanEvent,
  CompanionFeedbackContext,
  SomeCompanionFeedbackInputField,
} from '@companion-module/base'

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
  busSelect: VMixFeedback<BusSelectCallback>
  buttonShift: VMixFeedback<ButtonShiftCallback>
  buttonText: VMixFeedback<ButtonTextCallback>

  // Index signature
  [key: string]: VMixFeedback<any>
}

// Tally
interface InputPreviewCallback {
  feedbackId: 'inputPreview'
  options: Readonly<{
    input: string
    mix: number
    fg: number
    bg: number
    tally: TallySelection
  }>
}

interface InputLiveCallback {
  feedbackId: 'inputLive'
  options: Readonly<{
    input: string
    mix: number
    fg: number
    bg: number
    tally: TallySelection
  }>
}

interface OverlayStatusCallback {
  feedbackId: 'overlayStatus'
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
  feedbackId: 'videoTimer'
  options: Readonly<{
    input: string
    color: number
    color30: number
    color10: number
    loop: boolean
  }>
}

interface StatusCallback {
  feedbackId: 'status'
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
  feedbackId: 'busMute'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface BusSoloCallback {
  feedbackId: 'busSolo'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface InputAudioCallback {
  feedbackId: 'inputAudio'
  options: Readonly<{
    input: string
    fg: number
    bgLive: number
    bgMuted: number
  }>
}

interface InputSoloCallback {
  feedbackId: 'inputSolo'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface InputBusRoutingCallback {
  feedbackId: 'inputBusRouting'
  options: Readonly<{
    input: string
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface LiveBusVolumeCallback {
  feedbackId: 'liveBusVolume'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
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
  feedbackId: 'liveInputVolume'
  options: Readonly<{
    input: string
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
  feedbackId: 'busVolumeLevel'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Headphones'
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
    fg: number
    bg: number
  }>
}

interface InputVolumeLevelCallback {
  feedbackId: 'inputVolumeLevel'
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
  feedbackId: 'replayStatus'
  options: Readonly<{
    status: 'recording' | 'live'
    fg: number
    bg: number
  }>
}

interface ReplayEventsCallback {
  feedbackId: 'replayEvents'
  options: Readonly<{
    events: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
    fg: number
    bg: number
  }>
}

interface ReplayCameraCallback {
  feedbackId: 'replayCamera'
  options: Readonly<{
    channel: 'A' | 'B' | 'selected'
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    fg: number
    bg: number
  }>
}

interface ReplaySelectedChannelCallback {
  feedbackId: 'replaySelectedChannel'
  options: Readonly<{
    channel: 'AB' | 'A' | 'B'
    fg: number
    bg: number
  }>
}

// Video Call
interface VideoCallAudioSourceCallback {
  feedbackId: 'videoCallAudioSource'
  options: Readonly<{
    input: string
    source: 'Master' | 'Headphones' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface VideoCallVideoSourceCallback {
  feedbackId: 'videoCallVideoSource'
  options: Readonly<{
    input: string
    source: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
    fg: number
    bg: number
  }>
}

// Slides / List
interface InputSelectedIndexCallback {
  feedbackId: 'inputSelectedIndex'
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
  feedbackId: 'selectedDestinationInput'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface SelectedDestinationLayerCallback {
  feedbackId: 'selectedDestinationLayer'
  options: Readonly<{
    selectedIndex: string
    fg: number
    bg: number
  }>
}

interface RoutableMultiviewLayerCallback {
  feedbackId: 'routableMultiviewLaye'
  options: Readonly<{
    input: string
    fg: number
    bg: number
  }>
}

interface InputOnMultiviewCallback {
  feedbackId: 'inputOnMultiview'
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
  feedbackId: 'mixSelect'
  options: Readonly<{
    mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
    fg: number
    bg: number
  }>
}

interface BusSelectCallback {
  feedbackId: 'busSelect'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    fg: number
    bg: number
  }>
}

interface ButtonShiftCallback {
  feedbackId: 'buttonShift'
  options: Readonly<{
    fg: number
    bg: number
  }>
}

interface ButtonTextCallback {
  feedbackId: 'buttonText'
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

// DEPRECATED

type TallySelection = '' | 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR' | 'full'

// Force options to have a default to prevent sending undefined values
type InputFieldWithDefault = Exclude<SomeCompanionFeedbackInputField, 'default'> & {
  default: string | number | boolean | null
}

// vMix Boolean and Advanced feedback types
interface VMixFeedbackBoolean<T> {
  type: 'boolean'
  name: string
  description: string
  style: Partial<CompanionFeedbackButtonStyleResult>
  options: InputFieldWithDefault[]
  callback: (
    feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>,
    context: CompanionFeedbackContext
  ) => boolean | Promise<boolean>
  subscribe?: (feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>) => boolean
  unsubscribe?: (feedback: Readonly<Omit<CompanionFeedbackBooleanEvent, 'options' | 'type'> & T>) => boolean
}

interface VMixFeedbackAdvanced<T> {
  type: 'advanced'
  name: string
  description: string
  options: InputFieldWithDefault[]
  callback: (
    feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>,
    context: CompanionFeedbackContext
  ) => CompanionAdvancedFeedbackResult | Promise<CompanionAdvancedFeedbackResult>
  subscribe?: (
    feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>
  ) => CompanionAdvancedFeedbackResult
  unsubscribe?: (
    feedback: Readonly<Omit<CompanionFeedbackAdvancedEvent, 'options' | 'type'> & T>
  ) => CompanionAdvancedFeedbackResult
}

export type VMixFeedback<T> = VMixFeedbackBoolean<T> | VMixFeedbackAdvanced<T>

export function getFeedbacks(instance: VMixInstance): VMixFeedbacks {
  return {
    // Tally
    inputPreview: {
      type: 'advanced',
      name: 'Tally - Preview state',
      description: 'Indicates if an input is in Preview (or is a layer of an input that is if layer tally is selected)',
      options: [
        options.input,
        options.mixSelect,
        options.foregroundColor,
        options.backgroundColorPreview,
        options.layerTallyIndicator,
      ],
      callback: async (feedback, context) => {
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

        let optionsInput: any = await instance.parseOption(feedback.options.input, context)
        optionsInput = await Promise.all(optionsInput.map((value: any) => instance.data.getInput(value)))
        optionsInput = optionsInput.map(checkInput)

        if (
          optionsInput[instance.buttonShift.state] === 1 ||
          (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (optionsInput[instance.buttonShift.state] === 2) {
          if (!feedback.image?.width || !feedback.image?.height) return {}

          const indicatorBuffer = instance.indicator.drawIndicator(
            feedback.image.width,
            feedback.image.height,
            feedback.options.bg,
            feedback.options.tally
          )

          return {
            imageBuffer: indicatorBuffer,
          }
        } else {
          return {}
        }
      },
    },

    inputLive: {
      type: 'advanced',
      name: 'Tally - Program state',
      description: 'Indicates if an input is in Program (or is a layer of an input that is if layer tally is selected)',
      options: [
        options.input,
        options.mixSelect,
        options.foregroundColor,
        options.backgroundColorProgram,
        options.layerTallyIndicator,
      ],
      callback: async (feedback, context) => {
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

        let optionsInput: any = await instance.parseOption(feedback.options.input, context)
        optionsInput = await Promise.all(optionsInput.map((value: any) => instance.data.getInput(value)))
        optionsInput = optionsInput.map(checkInput)

        if (
          optionsInput[instance.buttonShift.state] === 1 ||
          (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (optionsInput[instance.buttonShift.state] === 2) {
          if (!feedback.image?.width || !feedback.image?.height) return {}

          const indicatorBuffer = instance.indicator.drawIndicator(
            feedback.image.width,
            feedback.image.height,
            feedback.options.bg,
            feedback.options.tally
          )

          return {
            imageBuffer: indicatorBuffer,
          }
        } else {
          return {}
        }
      },
    },

    overlayStatus: {
      type: 'advanced',
      name: 'Tally - Overlay state',
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
          default: combineRgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Program Background Color',
          id: 'bgProgram',
          default: combineRgb(255, 0, 0),
        },
      ],
      callback: async (feedback, context) => {
        let inputOptions: any = await instance.parseOption(feedback.options.input, context)
        inputOptions = await Promise.all(inputOptions.map((value: any) => instance.data.getInput(value)))
        inputOptions = inputOptions.map((input: Input) => input.number)

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

        return {}
      },
    },

    // General
    videoTimer: {
      type: 'advanced',
      name: 'Video - Video Timer',
      description: 'Indicate time remaining on video input',
      options: [
        options.input,
        {
          type: 'colorpicker',
          label: 'Text color',
          id: 'color',
          default: combineRgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color under 30s',
          id: 'color30',
          default: combineRgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color under 10s',
          id: 'color10',
          default: combineRgb(255, 0, 0),
        },
        {
          type: 'checkbox',
          label: 'Disable color change if looping',
          id: 'loop',
          default: false,
        },
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (!input || input.duration === 0) {
          return {}
        }

        const outPosition = input.markOut ? input.markOut : input.duration
        const remaining = outPosition - input.position

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

        return { color: color() }
      },
    },

    status: {
      type: 'advanced',
      name: 'vMix - status',
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
        return {}
      },
    },

    // Audio
    busMute: {
      type: 'advanced',
      name: 'Audio - Bus mute',
      description: 'Indicate if a bus is muted',
      options: [options.audioBusMaster, options.foregroundColor, options.backgroundColorProgram],
      callback: (feedback) => {
        const busID = feedback.options.value === 'Master' ? 'master' : `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.muted ? { color: feedback.options.fg, bgcolor: feedback.options.bg } : {}
      },
    },

    busSolo: {
      type: 'advanced',
      name: 'Audio - Bus solo',
      description: 'Requires vMix v25',
      options: [options.audioBus, options.foregroundColorBlack, options.backgroundColorYellow],
      callback: (feedback) => {
        const busID = `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.solo ? { color: feedback.options.fg, bgcolor: feedback.options.bg } : {}
      },
    },

    inputAudio: {
      type: 'advanced',
      name: 'Audio - Input mute',
      description: 'Indicate if an input is muted or enabled',
      options: [
        options.input,
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Audio Live color',
          id: 'bgLive',
          default: combineRgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Audio Muted color',
          id: 'bgMuted',
          default: combineRgb(255, 0, 0),
        },
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (!input) {
          return {}
        }

        if (input.muted) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bgMuted }
        } else {
          return { bgcolor: feedback.options.bgLive }
        }
      },
    },

    inputSolo: {
      type: 'advanced',
      name: 'Audio - Input solo',
      description: 'Indicate if an input is set to Solo',
      options: [options.input, options.foregroundColor, options.backgroundColorProgram],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (input?.solo) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    inputBusRouting: {
      type: 'advanced',
      name: 'Audio - Input Bus Routing',
      description: 'Indicate which busses an input will output to',
      options: [
        options.input,
        options.audioBusMaster,
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Background color',
          id: 'bg',
          default: combineRgb(255, 255, 0),
        },
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)
        const busID = feedback.options.value === 'Master' ? 'M' : feedback.options.value

        if (input?.audioBusses?.[busID]) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    liveBusVolume: {
      type: 'advanced',
      name: 'Audio - Bus live dB value',
      description: 'Indicate what the live dB value on a bus is',
      options: [
        options.audioBusMaster,
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
          default: combineRgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: combineRgb(255, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: combineRgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: combineRgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: combineRgb(0, 192, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: combineRgb(0, 128, 0),
        },
      ],
      callback: (feedback) => {
        const busID = feedback.options.value === 'Master' ? 'master' : 'bus' + feedback.options.value
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

          const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
          const colorBg = feedback.options.colorBG ? color() : undefined

          return { color: colorFg, bgcolor: colorBg }
        }

        return {}
      },
    },

    liveInputVolume: {
      type: 'advanced',
      name: 'Audio - Input live dB value',
      description: 'Indicate what the live dB value on an input is',
      options: [
        options.input,
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
          default: combineRgb(255, 255, 255),
        },
        {
          type: 'colorpicker',
          label: 'Text color above -1 dB',
          id: 'color',
          default: combineRgb(255, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -1 dB',
          id: 'color1',
          default: combineRgb(255, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -6 dB',
          id: 'color6',
          default: combineRgb(0, 255, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -18 dB',
          id: 'color18',
          default: combineRgb(0, 192, 0),
        },
        {
          type: 'colorpicker',
          label: 'Text color below -36 dB',
          id: 'color36',
          default: combineRgb(0, 128, 0),
        },
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        // Detect if there is sound enabled on an input
        if (!input?.meterF1 || !input?.meterF2) {
          return {}
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

        const colorFg = feedback.options.colorTxt ? color() : feedback.options.colorBase
        const colorBg = feedback.options.colorBG ? color() : undefined

        return { color: colorFg, bgcolor: colorBg }
      },
    },

    busVolumeLevel: {
      type: 'advanced',
      name: 'Audio - Bus Volume',
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

        return {}
      },
    },

    inputVolumeLevel: {
      type: 'advanced',
      name: 'Audio - Input Volume',
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
      callback: async (feedback) => {
        const input = await instance.data.getInput(feedback.options.input)

        if (input?.volume === undefined) {
          return {}
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

        return {}
      },
    },

    // Replay
    replayStatus: {
      type: 'advanced',
      name: 'Replay - Recording/Live',
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

        return {}
      },
    },

    replayEvents: {
      type: 'advanced',
      name: 'Replay - Events Tab',
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

        return {}
      },
    },

    replayCamera: {
      type: 'advanced',
      name: 'Replay - Camera Live',
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

        return {}
      },
    },

    replaySelectedChannel: {
      type: 'advanced',
      name: 'Replay - Selected Channel',
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

        return {}
      },
    },

    // Video Call
    videoCallAudioSource: {
      type: 'advanced',
      name: 'Video Call - Audio Source',
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
      callback: async (feedback) => {
        const input = await instance.data.getInput(feedback.options.input)

        if (input?.callAudioSource === feedback.options.source) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    videoCallVideoSource: {
      type: 'advanced',
      name: 'Video Call - Video Source',
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
      callback: async (feedback) => {
        const input = await instance.data.getInput(feedback.options.input)

        if (input?.callVideoSource === feedback.options.source) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    // Slides / List
    inputSelectedIndex: {
      type: 'advanced',
      name: 'Slides/List - Change Colors Based On Selected Slide/Index',
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
          default: combineRgb(0, 0, 0),
        },
        {
          type: 'colorpicker',
          label: 'Empty List Warning Background',
          id: 'eb',
          default: combineRgb(255, 255, 0),
        },
      ],
      callback: async (feedback) => {
        const input = await instance.data.getInput(feedback.options.input)

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

        return {}
      },
    },

    // Layers
    selectedDestinationInput: {
      type: 'advanced',
      name: 'Layers - Destination Input Indicator',
      description: 'Indicates if input is currently selected for Layer Routing',
      options: [options.input, options.foregroundColorBlack, options.backgroundColorYellow],
      callback: async (feedback, context) => {
        if (instance.routingData.layer.destinationInput === null) return {}

        const selectInput = (await instance.data.getInput(instance.routingData.layer.destinationInput))?.key || ''
        const parseInputValue = await instance.parseOption(feedback.options.input, context)

        const getInputValue = []
        for (const input of parseInputValue) {
          let target = input
          if (input === '0') target = instance.data.mix[0].preview.toString()
          if (input === '-1') target = instance.data.mix[0].program.toString()
          const getInput = await instance.data.getInput(target)
          getInputValue.push(getInput?.key || null)
        }

        if (
          getInputValue[instance.buttonShift.state] === selectInput ||
          (instance.buttonShift.blink && instance.config.shiftBlinkLayerRouting && getInputValue.includes(selectInput))
        ) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    selectedDestinationLayer: {
      type: 'advanced',
      name: 'Layers - Destination Layer Indicator',
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
      callback: async (feedback, context) => {
        const getIndexValue = await instance.parseOption(feedback.options.selectedIndex + '', context)
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

        return {}
      },
    },

    routableMultiviewLayer: {
      type: 'advanced',
      name: 'Layers - check if input is on destination Layer of destination input',
      description: 'Indicates if the input is destination layer and input',
      options: [options.input, options.foregroundColor, options.backgroundColorYellow],
      callback: async (feedback, context) => {
        const parseInputValue = await instance.parseOption(feedback.options.input, context)
        const getInputValue = []

        for (const input of parseInputValue) {
          const value = (await instance.data.getInput(input))?.key || null
          getInputValue.push(value)
        }

        if (
          getInputValue[instance.buttonShift.state] === null ||
          instance.routingData.layer.destinationInput === null ||
          instance.routingData.layer.destinationLayer === null
        ) {
          return {}
        }

        const selectedInput = await instance.data.getInput(instance.routingData.layer.destinationInput)
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

        return {}
      },
    },

    inputOnMultiview: {
      type: 'advanced',
      name: 'Layers - check if X input is on Layer on Y input',
      description: 'Indicates if the input is currently on a specified layer of an input',
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
      callback: async (feedback, context) => {
        const parseInputXValue = await instance.parseOption(feedback.options.inputX, context)
        const inputXValue: any = []

        for (const input of parseInputXValue) {
          const value = (await instance.data.getInput(input))?.key || null
          inputXValue.push(value)
        }

        const parseInputYValue = await instance.parseOption(feedback.options.inputY, context)
        const inputYValue: any = []

        for (const input of parseInputYValue) {
          const value = await instance.data.getInput(input)
          inputYValue.push(value)
        }

        const check = (state: number): boolean => {
          if (feedback.options.layer === 0) {
            return inputYValue[state]?.overlay?.find((layer: any) => layer.key === inputXValue[state]) !== undefined
          } else {
            const layer = inputYValue[state]?.overlay?.find((layer: any) => layer.index === feedback.options.layer - 1)
            return layer?.key === inputXValue[state]
          }
        }

        const primaryCheck = check(instance.buttonShift.state)
        const secondaryCheck = inputYValue.map((input: Input, index: number) => {
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

        return {}
      },
    },

    // Util
    mixSelect: {
      type: 'advanced',
      name: 'Util - Mix Selected',
      description: 'Currently selected Mix',
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
          ],
        },
        options.foregroundColor,
        options.backgroundColorYellow,
      ],
      callback: (feedback) => {
        if (instance.routingData.mix === feedback.options.mix) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    busSelect: {
      type: 'advanced',
      name: 'Util - Bus Selected',
      description: 'Currently selected Bus',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: 'Master',
          choices: [{ id: 'Master', label: 'Master' }, ...AUDIOBUSSES.map((id) => ({ id, label: id }))]
        },
        options.foregroundColor,
        options.backgroundColorYellow
      ],
      callback: (feedback) => {
        if (instance.routingData.bus === feedback.options.bus) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      }
    },

    buttonShift: {
      type: 'advanced',
      name: 'Util - Button Shift state',
      description: 'Indicates Shift state',
      options: [options.foregroundColorBlack, options.backgroundColorYellow],
      callback: (feedback) => {
        if (instance.buttonShift.state !== 0) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        }

        return {}
      },
    },

    buttonText: {
      type: 'advanced',
      name: 'Util - Shift text',
      description: 'Used to display text on a button that changes based on Shift state',
      options: [
        {
          type: 'textinput',
          label: 'Text',
          id: 'text',
          default: instance.config.shiftDelimiter,
        },
      ],
      callback: async (feedback, context) => {
        const textSplit = (await instance.parseOption(feedback.options.text, context))[instance.buttonShift.state]

        return { text: textSplit || undefined }
      },
    },
  }
}
