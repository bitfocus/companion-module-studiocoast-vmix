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
import { presets, graphics } from 'companion-module-utils'

type MixOptionEntry = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -1 | -2

export interface VMixFeedbacks {
  // Tally
  inputPreview: VMixFeedback<InputPreviewCallback>
  inputLive: VMixFeedback<InputLiveCallback>
  overlayStatus: VMixFeedback<OverlayStatusCallback>

  // General
  videoTimer: VMixFeedback<VideoTimerCallback>
  status: VMixFeedback<StatusCallback>
  outputStatus: VMixFeedback<OutputStatusCallback>
  outputNDISRT: VMixFeedback<OutputNDISRTCallback>

  // Audio
  busMute: VMixFeedback<BusMuteCallback>
  busSolo: VMixFeedback<BusSoloCallback>
  busSendToMaster: VMixFeedback<BusSendToMasterCallback>
  inputAudio: VMixFeedback<InputAudioCallback>
  inputAudioAuto: VMixFeedback<InputAudioAutoCallback>
  inputSolo: VMixFeedback<InputSoloCallback>
  inputBusRouting: VMixFeedback<InputBusRoutingCallback>
  liveBusVolume: VMixFeedback<LiveBusVolumeCallback>
  liveInputVolume: VMixFeedback<LiveInputVolumeCallback>
  busVolumeLevel: VMixFeedback<BusVolumeLevelCallback>
  inputVolumeLevel: VMixFeedback<InputVolumeLevelCallback>
  busVolumeMeter: VMixFeedback<BusVolumeMeterCallback>
  inputVolumeMeter: VMixFeedback<InputVolumeMeterCallback>

  // Media
  inputLoop: VMixFeedback<InputLoopCallback>

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
  inputSelectedIndexBoolean: VMixFeedback<InputSelectedIndexBooleanCallback>

  // Layers
  selectedDestinationInput: VMixFeedback<SelectedDestinationInputCallback>
  selectedDestinationLayer: VMixFeedback<SelectedDestinationLayerCallback>
  routableMultiviewLayer: VMixFeedback<RoutableMultiviewLayerCallback>
  inputOnMultiview: VMixFeedback<InputOnMultiviewCallback>

  // General
  dynamic: VMixFeedback<DynamicCallback>
  inputState: VMixFeedback<InputStateCallback>

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
    mix: MixOptionEntry
    mixVariable: string
    fg: number
    bg: number
    tally: TallySelection
  }>
}

interface InputLiveCallback {
  feedbackId: 'inputLive'
  options: Readonly<{
    input: string
    mix: MixOptionEntry
    mixVariable: string
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
    value: '' | '0' | '1' | '2' | '3' | '4'
  }>
}

interface OutputStatusCallback {
  feebbackId: 'outoutStatus'
  options: Readonly<{
    output: 'Fullscreen 1' | 'FUllscreen 2' | 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4' | 'Custom'
    custom: string
    type: 'Output' | 'Preview' | 'MultiView' | 'MultiView2' | 'Replay' | 'Mix' | 'Input'
    mix: string
    input: string
  }>
}

interface OutputNDISRTCallback {
  feebbackId: 'outputNDISRT'
  options: Readonly<{
    output: 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4' | 'Custom'
    custom: string
    type: 'ndi' | 'srt'
  }>
}

// Audio
interface BusMuteCallback {
  feedbackId: 'busMute'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  }>
}

interface BusSoloCallback {
  feedbackId: 'busSolo'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  }>
}

interface BusSendToMasterCallback {
  feedbackId: 'busSendToMaster'
  options: Readonly<{
    value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  }>
}

interface InputAudioCallback {
  feedbackId: 'inputAudio'
  options: Readonly<{
    input: string
  }>
}

interface InputAudioAutoCallback {
  feedbackId: 'inputAudioAuto'
  options: Readonly<{
    input: string
  }>
}

interface InputSoloCallback {
  feedbackId: 'inputSolo'
  options: Readonly<{
    input: string
  }>
}

interface InputBusRoutingCallback {
  feedbackId: 'inputBusRouting'
  options: Readonly<{
    input: string
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
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
  }>
}

interface InputVolumeLevelCallback {
  feedbackId: 'inputVolumeLevel'
  options: Readonly<{
    input: string
    comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'
    value: number
  }>
}

interface BusVolumeMeterCallback {
  feedbackId: 'busVolumeMeter'
  options: Readonly<{
    value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Selected'
  }>
}

interface InputVolumeMeterCallback {
  feedbackId: 'inputVolumeMeter'
  options: Readonly<{
    input: string
  }>
}

// Media
interface InputLoopCallback {
  feedbackId: 'inputLoop'
  options: Readonly<{
    input: string
  }>
}

// Replay
interface ReplayStatusCallback {
  feedbackId: 'replayStatus'
  options: Readonly<{
    status: 'recording' | 'live'
  }>
}

interface ReplayEventsCallback {
  feedbackId: 'replayEvents'
  options: Readonly<{
    channel: 'A' | 'B' | 'selected'
    events: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  }>
}

interface ReplayCameraCallback {
  feedbackId: 'replayCamera'
  options: Readonly<{
    channel: 'A' | 'B' | 'selected'
    camera: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  }>
}

interface ReplaySelectedChannelCallback {
  feedbackId: 'replaySelectedChannel'
  options: Readonly<{
    channel: 'AB' | 'A' | 'B'
  }>
}

// Video Call
interface VideoCallAudioSourceCallback {
  feedbackId: 'videoCallAudioSource'
  options: Readonly<{
    input: string
    source: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
  }>
}

interface VideoCallVideoSourceCallback {
  feedbackId: 'videoCallVideoSource'
  options: Readonly<{
    input: string
    source: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
  }>
}

// Slides / List
interface InputSelectedIndexCallback {
  feedbackId: 'inputSelectedIndex'
  options: Readonly<{
    input: string
    selectedIndex: string
    fg: number
    bg: number
    et: number
    eb: number
  }>
}

interface InputSelectedIndexBooleanCallback {
  feedbackId: 'inputSelectedIndexBoolean'
  options: Readonly<{
    input: string
    selectedIndex: string
  }>
}

// Layers
interface SelectedDestinationInputCallback {
  feedbackId: 'selectedDestinationInput'
  options: Readonly<{
    input: string
  }>
}

interface SelectedDestinationLayerCallback {
  feedbackId: 'selectedDestinationLayer'
  options: Readonly<{
    selectedIndex: string
  }>
}

interface RoutableMultiviewLayerCallback {
  feedbackId: 'routableMultiviewLayer'
  options: Readonly<{
    input: string
  }>
}

interface InputOnMultiviewCallback {
  feedbackId: 'inputOnMultiview'
  options: Readonly<{
    inputX: string
    inputY: string
    layer: string
  }>
}

// General
interface DynamicCallback {
  feedbackId: 'dynamic'
  options: Readonly<{
    type: 'dynamicInput' | 'dynamicValue'
    number: number
    value: string
  }>
}

interface InputStateCallback {
  feedbackId: 'inputState'
  options: Readonly<{
    type: 'playing' | 'loop'
    input: string
  }>
}

// Util
interface MixSelectCallback {
  feedbackId: 'mixSelect'
  options: Readonly<{
    mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -2
    mixVariable: string
  }>
}

interface BusSelectCallback {
  feedbackId: 'busSelect'
  options: Readonly<{
    bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  }>
}

interface ButtonShiftCallback {
  feedbackId: 'buttonShift'
  options: Record<string, never>
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
  | OutputStatusCallback
  | OutputNDISRTCallback

  // Audio
  | BusMuteCallback
  | BusSoloCallback
  | BusSendToMasterCallback
  | InputAudioCallback
  | InputAudioAutoCallback
  | InputSoloCallback
  | InputBusRoutingCallback
  | LiveBusVolumeCallback
  | LiveInputVolumeCallback
  | BusVolumeLevelCallback
  | InputVolumeLevelCallback
  | BusVolumeMeterCallback
  | InputVolumeMeterCallback

  // Media
  | InputLoopCallback

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
  | InputSelectedIndexBooleanCallback

  // Layers
  | InputOnMultiviewCallback
  | SelectedDestinationInputCallback
  | SelectedDestinationLayerCallback
  | RoutableMultiviewLayerCallback

  // General
  | DynamicCallback
  | InputStateCallback

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
  defaultStyle: Partial<CompanionFeedbackButtonStyleResult>
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
        options.mixVariable,
        options.foregroundColor,
        options.backgroundColorPreview,
        options.layerTallyIndicator,
      ],
      callback: async (feedback, context) => {
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[
          instance.buttonShift.state
        ]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = feedback.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

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
          if (!feedback.image) return {}

          let indicator

          if (feedback.options.tally === 'border') {
            indicator = graphics.border({
              width: feedback.image.width,
              height: feedback.image.height,
              size: 4,
              color: feedback.options.bg,
            })
          } else if (feedback.options.tally.includes('corner')) {
            let location: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft'

            if (feedback.options.tally === 'cornerTR') location = 'topRight'
            if (feedback.options.tally === 'cornerBL') location = 'bottomLeft'
            if (feedback.options.tally === 'cornerBR') location = 'bottomRight'

            indicator = graphics.corner({
              width: feedback.image.width,
              height: feedback.image.height,
              color: feedback.options.bg,
              size: 24,
              location,
            })
          }

          return {
            imageBuffer: indicator,
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
        options.mixVariable,
        options.foregroundColor,
        options.backgroundColorProgram,
        options.layerTallyIndicator,
      ],
      callback: async (feedback, context) => {
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[
          instance.buttonShift.state
        ]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = feedback.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

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
          if (!feedback.image) return {}

          let indicator

          if (feedback.options.tally === 'border') {
            indicator = graphics.border({
              width: feedback.image.width,
              height: feedback.image.height,
              size: 4,
              color: feedback.options.bg,
            })
          } else if (feedback.options.tally.includes('corner')) {
            let location: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft'

            if (feedback.options.tally === 'cornerTR') location = 'topRight'
            if (feedback.options.tally === 'cornerBL') location = 'bottomLeft'
            if (feedback.options.tally === 'cornerBR') location = 'bottomRight'

            indicator = graphics.corner({
              width: feedback.image.width,
              height: feedback.image.height,
              color: feedback.options.bg,
              size: 24,
              location,
            })
          }

          return {
            imageBuffer: indicator,
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
        inputOptions = inputOptions.map((input: Input | null) => (input !== null ? input.number : null))

        let preview = false
        let program = false

        instance.data.overlays.forEach((overlay) => {
          const overlayNumberCheck =
            overlay.number === parseInt(feedback.options.overlay, 10) || feedback.options.overlay === '0'
          const overlayInputCheck =
            (overlay.input === inputOptions[instance.buttonShift.state] &&
              inputOptions[instance.buttonShift.state] !== null) ||
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
      type: 'boolean',
      name: 'vMix - Status',
      description: 'Current status of vMix, such as recording, external, etc...',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
        {
          type: 'dropdown',
          label: 'Stream Feedback Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '1' },
            { id: '1', label: '2' },
            { id: '2', label: '3' },
            { id: '3', label: '4' },
            { id: '4', label: '5' },
          ],
          isVisible: (options) => {
            return options.status === 'streaming'
          },
        },
      ],
      callback: (feedback) => {
        if (feedback.options.status === 'connection') {
          if (instance.connected) return true
        } else {
          if (instance.data.status !== undefined) {
            if (feedback.options.status === 'streaming') {
              const anyStream = feedback.options.value === '' && instance.data.status.stream.includes(true)
              const specificStream = instance.data.status.stream[parseInt(feedback.options.value, 10)]
              if (anyStream || specificStream) return true
            } else {
              if (instance.data.status[feedback.options.status]) return true
            }
          }
        }
        return false
      },
    },

    outputStatus: {
      type: 'boolean',
      name: 'vMix - Output Status',
      description: 'Requires vMix 28+',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Output',
          id: 'output',
          default: 'Fullscreen 1',
          choices: [
            { id: 'Fullscreen 1', label: 'Fullscreen 1' },
            { id: 'Fullscreen 2', label: 'Fullscreen 2' },
            { id: 'Output 1', label: 'Output 1' },
            { id: 'Output 2', label: 'Output 2' },
            { id: 'Output 3', label: 'Output 3' },
            { id: 'Output 4', label: 'Output 4' },
            { id: 'Custom', label: 'Use Variable' },
          ],
        },
        {
          type: 'textinput',
          label: 'Output by Variable',
          id: 'custom',
          default: '',
          useVariables: true,
          isVisible: (options) => options.output === 'Custom',
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Output',
          choices: [
            { id: 'Output', label: 'Output' },
            { id: 'Preview', label: 'Preview' },
            { id: 'MultiView', label: 'MultiView' },
            { id: 'MultiView2', label: 'MultiView2' },
            { id: 'Replay', label: 'Replay' },
            { id: 'Mix', label: 'Mix' },
            { id: 'Input', label: 'Input' },
          ],
        },
        {
          type: 'textinput',
          label: 'Mix (1 to 16)',
          id: 'mix',
          default: '',
          useVariables: true,
          isVisible: (options) => options.type === 'Mix',
        },
        {
          type: 'textinput',
          label: 'Input',
          id: 'input',
          default: '',
          useVariables: true,
          isVisible: (options) => options.type === 'Input',
        },
      ],
      callback: async (feedback, context) => {
        const outputSelect: any =
          feedback.options.output === 'Custom'
            ? (await instance.parseOption(feedback.options.custom, context))[instance.buttonShift.state]
            : feedback.options.output
        if (!['Fullscreen 1', 'Fullscreen 2', 'Output 1', 'Output 2', 'Output 3', 'Output 4'].includes(outputSelect))
          return false

        const outputType = outputSelect.startsWith('Fullscreen') ? 'fullscreen' : 'output'
        const outputNumber = parseInt(outputSelect[outputSelect.length - 1])

        if (isNaN(outputNumber)) return false

        const output = instance.data.outputs.find((x) => {
          return x.type === outputType && x.number === outputNumber
        })

        if (!output) return false

        if (feedback.options.type === 'Mix' && output.source === 'Mix') {
          const mix = (await instance.parseOption(feedback.options.mix, context))[instance.buttonShift.state]
          return output.mix + 1 === parseInt(mix, 10)
        } else if (feedback.options.type === 'Input' && output.source === 'Input') {
          const inputSelect = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
          const input = await instance.data.getInput(inputSelect)
          return input ? input.number === output.input : false
        } else {
          return output.source === feedback.options.type
        }
      },
    },

    outputNDISRT: {
      type: 'boolean',
      name: 'vMix - Output NDI/SRT Status',
      description: 'Requires vMix 28+',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Output',
          id: 'output',
          default: 'Output 1',
          choices: [
            { id: 'Output 1', label: 'Output 1' },
            { id: 'Output 2', label: 'Output 2' },
            { id: 'Output 3', label: 'Output 3' },
            { id: 'Output 4', label: 'Output 4' },
            { id: 'Custom', label: 'Use Variable' },
          ],
        },
        {
          type: 'textinput',
          label: 'Output by Variable',
          id: 'custom',
          default: '',
          useVariables: true,
          isVisible: (options) => options.output === 'Custom',
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'ndi',
          choices: [
            { id: 'ndi', label: 'NDI' },
            { id: 'srt', label: 'SRT' },
          ],
        },
      ],
      callback: async (feedback, context) => {
        const outputSelect: any =
          feedback.options.output === 'Custom'
            ? (await instance.parseOption(feedback.options.custom, context))[instance.buttonShift.state]
            : feedback.options.output
        if (!['Output 1', 'Output 2', 'Output 3', 'Output 4'].includes(outputSelect)) return false

        const outputNumber = parseInt(outputSelect[outputSelect.length - 1])

        if (isNaN(outputNumber)) return false

        const output = instance.data.outputs.find((x) => {
          return x.type === 'output' && x.number === outputNumber
        })

        if (!output) return false

        return output[feedback.options.type as 'ndi' | 'srt']
      },
    },

    // Audio
    busMute: {
      type: 'boolean',
      name: 'Audio - Bus mute',
      description: 'Indicate if a bus is muted',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [options.audioBusMaster],
      callback: (feedback) => {
        const busID = feedback.options.value === 'Master' ? 'master' : `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.muted || false
      },
    },

    busSolo: {
      type: 'boolean',
      name: 'Audio - Bus solo',
      description: 'Requires vMix v25+',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.audioBus],
      callback: (feedback) => {
        const busID = `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.solo || false
      },
    },

    busSendToMaster: {
      type: 'boolean',
      name: 'Audio - Bus Send to Master',
      description: 'Requires vMix v27+',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.audioBus],
      callback: (feedback) => {
        const busID = `bus${feedback.options.value}`
        const bus = instance.data.getAudioBus(busID)

        return bus?.sendToMaster || false
      },
    },

    inputAudio: {
      type: 'boolean',
      name: 'Audio - Input mute',
      description: 'Indicate if an input is muted or enabled',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.muted || false
      },
    },

    inputAudioAuto: {
      type: 'boolean',
      name: 'Audio - Input Audio Auto',
      description: 'Indicate if an input will auto enable/disable audio when transitioned to/from',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(0, 255, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.audioAuto || false
      },
    },

    inputSolo: {
      type: 'boolean',
      name: 'Audio - Input solo',
      description: 'Indicate if an input is set to Solo',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.solo || false
      },
    },

    inputBusRouting: {
      type: 'boolean',
      name: 'Audio - Input Bus Routing',
      description: 'Indicate which busses an input will output to',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input, options.audioBusMaster],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)
        const busID = feedback.options.value === 'Master' ? 'M' : feedback.options.value

        return input?.audioBusses?.[busID] || false
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
      type: 'boolean',
      name: 'Audio - Bus Volume',
      description: 'Indicate if an output bus fader is within a set range',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(0, 255, 0),
      },
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

        return volumeInRange[feedback.options.comparison]
      },
    },

    inputVolumeLevel: {
      type: 'boolean',
      name: 'Audio - Input Volume',
      description: 'Indicate if an input fader is in a set value',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(0, 255, 0),
      },
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
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (input?.volume === undefined) return false

        const volume = instance.config.volumeLinear ? volumeToLinear(input.volume) : input.volume

        const volumeInRange = {
          eq: volume === feedback.options.value,
          lt: volume < feedback.options.value,
          lte: volume <= feedback.options.value,
          gt: volume > feedback.options.value,
          gte: volume >= feedback.options.value,
        }

        return volumeInRange[feedback.options.comparison] || false
      },
    },

    busVolumeMeter: {
      type: 'advanced',
      name: 'Audio - Bus Volume Meters',
      description: 'Volumer meters for an Bus',
      options: [options.audioBusMaster],
      callback: async (feedback) => {
        if (!feedback.image) return {}
        let id = feedback.options.value

        if (id === 'Selected') {
          id = instance.routingData.bus
          if (!id) return {}
        }
        const busID = id === 'Master' ? 'master' : 'bus' + id
        const bus = instance.data.getAudioBus(busID)

        if (!bus) return {}

        const meter = presets.meter1({
          width: feedback.image.width,
          height: feedback.image.height,
          meter1: volumeToLinear(bus.meterF1 * 100),
          meter2: volumeToLinear(bus.meterF2 * 100),
          muted: bus.muted,
        })

        return {
          imageBuffer: meter,
        }
      },
    },

    inputVolumeMeter: {
      type: 'advanced',
      name: 'Audio - Input Volume Meters',
      description: 'Volumer meters for an input',
      options: [options.input],
      callback: async (feedback, context) => {
        if (!feedback.image) return {}
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (!input || input.meterF1 === undefined || input.meterF2 === undefined) {
          return {}
        }

        const meter = presets.meter1({
          width: feedback.image.width,
          height: feedback.image.height,
          meter1: volumeToLinear(input.meterF1 * 100),
          meter2: volumeToLinear(input.meterF2 * 100),
          muted: input.muted,
        })

        return {
          imageBuffer: meter,
        }
      },
    },

    // Media
    inputLoop: {
      type: 'boolean',
      name: 'Media - Input Loop',
      description: 'Input Loop Status',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.loop || false
      },
    },

    // Replay
    replayStatus: {
      type: 'boolean',
      name: 'Replay - Recording/Live',
      description: 'Indicates current recording or live status of a replay input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
      ],
      callback: (feedback) => {
        return instance.data.replay[feedback.options.status]
      },
    },

    replayEvents: {
      type: 'boolean',
      name: 'Replay - Events Tab',
      description: 'Indicates currently selected Events tab',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
          label: 'Events',
          id: 'events',
          default: 1,
          choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => ({
            id: id,
            label: id.toString(),
          })),
        },
      ],
      callback: (feedback) => {
        const channel = feedback.options.channel

        if (channel === 'selected') {
          return instance.data.replay.events === feedback.options.events
        } else if (channel === 'A') {
          return instance.data.replay.eventsA === feedback.options.events
        } else {
          return instance.data.replay.eventsB === feedback.options.events
        }
      },
    },

    replayCamera: {
      type: 'boolean',
      name: 'Replay - Camera Live',
      description: 'Indicates current replay camera being live on a channel',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
      ],
      callback: (feedback) => {
        let channel = feedback.options.channel

        if (channel === 'selected') {
          // Backways compatibility - Default to channel A if prior to v24
          channel =
            !instance.data.replay.channelMode || instance.data.replay.channelMode === 'AB'
              ? 'A'
              : instance.data.replay.channelMode
        }

        const cameraChannel = ('camera' + channel) as 'cameraA' | 'cameraB'

        return instance.data.replay[cameraChannel] == feedback.options.camera
      },
    },

    replaySelectedChannel: {
      type: 'boolean',
      name: 'Replay - Selected Channel',
      description: 'Indicates currently selected channel',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
      ],
      callback: (feedback) => {
        return instance.data.replay.channelMode && instance.data.replay.channelMode === feedback.options.channel
      },
    },

    // Video Call
    videoCallAudioSource: {
      type: 'boolean',
      name: 'Video Call - Audio Source',
      description: 'Indicates audio source for a video call',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.callAudioSource === feedback.options.source
      },
    },

    videoCallVideoSource: {
      type: 'boolean',
      name: 'Video Call - Video Source',
      description: 'Indicates video source for a video call',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Source',
          id: 'source',
          default: 'Output1',
          choices: ['Output1', 'Output2', 'Output3', 'Output4', 'None'].map((id) => ({ id, label: id })),
        },
      ],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.callVideoSource === feedback.options.source
      },
    },

    // Slides / List
    inputSelectedIndex: {
      type: 'advanced',
      name: 'Slides/List - Change Colors Based On Selected Slide/Index/Virtual Set',
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
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)
        const index = (await instance.parseOption(feedback.options.selectedIndex, context))[instance.buttonShift.state]

        if (input?.type === 'VideoList') {
          if (input.selectedIndex === parseInt(index, 10)) {
            return { color: feedback.options.fg, bgcolor: feedback.options.bg }
          } else if (input?.list?.length === 0) {
            return { color: feedback.options.et, bgcolor: feedback.options.eb }
          }
        } else if (input?.type === 'PowerPoint' || input?.type === 'VirtualSet') {
          if (input.selectedIndex === parseInt(index, 10)) {
            return { color: feedback.options.fg, bgcolor: feedback.options.bg }
          }
        }

        return {}
      },
    },

    inputSelectedIndexBoolean: {
      type: 'boolean',
      name: 'Slides/List - Change style based on an inputs Selected Index',
      description: '',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [options.input, options.selectedIndex],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)
        const index = (await instance.parseOption(feedback.options.selectedIndex, context))[instance.buttonShift.state]

        return input?.selectedIndex === parseInt(index, 10)
      },
    },

    // Layers
    selectedDestinationInput: {
      type: 'boolean',
      name: 'Layers - Destination Input Indicator',
      description: 'Indicates if input is currently selected for Layer Routing',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input],
      callback: async (feedback, context) => {
        if (instance.routingData.layer.destinationInput === null) return false

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

        const blink =
          instance.buttonShift.blink && instance.config.shiftBlinkLayerRouting && getInputValue.includes(selectInput)

        return getInputValue[instance.buttonShift.state] === selectInput || blink
      },
    },

    selectedDestinationLayer: {
      type: 'boolean',
      name: 'Layers - Destination Layer Indicator',
      description: 'Indicates if layer is currently selected for Layer Routing',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [
        {
          type: 'textinput',
          label: 'Destination Layer of destination Input',
          id: 'selectedIndex',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (feedback, context) => {
        const getIndexValue = await instance.parseOption(feedback.options.selectedIndex + '', context)
        const blink =
          instance.routingData.layer.destinationLayer !== null &&
          instance.buttonShift.blink &&
          instance.config.shiftBlinkLayerRouting &&
          getIndexValue.includes(instance.routingData.layer.destinationLayer)

        return getIndexValue[instance.buttonShift.state] === instance.routingData.layer.destinationLayer || blink
      },
    },

    routableMultiviewLayer: {
      type: 'boolean',
      name: 'Layers - check if input is on destination Layer of destination input',
      description: 'Indicates if the input is destination layer and input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [options.input],
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
          return false
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

          return selectedLayer?.key === getInputValue[instance.buttonShift.state] || blink
        }

        return false
      },
    },

    inputOnMultiview: {
      type: 'boolean',
      name: 'Layers - check if X input is on Layer on Y input',
      description: 'Indicates if the input is currently on a specified layer of an input',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [
        {
          type: 'textinput',
          label: 'Input X',
          id: 'inputX',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Input Y',
          id: 'inputY',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Layer',
          id: 'layer',
          default: '0',
          tooltip: '1-10, 0 = Any layer',
          useVariables: true,
        },
      ],
      callback: async (feedback, context) => {
        const targetLayer = await instance.parseOption(feedback.options.layer, context)
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
          const target = parseInt(targetLayer[state], 10)
          if (target === 0) {
            return inputYValue[state]?.overlay?.find((layer: any) => layer.key === inputXValue[state]) !== undefined
          } else {
            const layer = inputYValue[state]?.overlay?.find((layer: any) => layer.index === target - 1)
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

        return (
          primaryCheck ||
          (secondaryCheck.includes(true) && instance.config.shiftBlinkLayerRouting && instance.buttonShift.blink)
        )
      },
    },

    // General
    dynamic: {
      type: 'boolean',
      name: 'General - Dynamic Input or Value',
      description: 'Check if a Dynamic Input or Value matches a specified value',
      options: [
        {
          type: 'dropdown',
          label: 'Select Type',
          id: 'type',
          default: 'dynamicInput',
          choices: [
            { id: 'dynamicInput', label: 'Dynamic Input' },
            { id: 'dynamicValue', label: 'Dynamic Value' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Select Number',
          id: 'number',
          default: '1',
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
          ],
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      defaultStyle: {
        bgcolor: combineRgb(255, 0, 0),
      },
      callback: async (feedback, context) => {
        const targetValue = (await instance.parseOption(feedback.options.value, context))[instance.buttonShift.state]
        const dynamic: string = instance.data[feedback.options.type][feedback.options.number]?.value

        return targetValue === dynamic
      },
    },

    inputState: {
      type: 'boolean',
      name: 'General - Input State',
      description: 'Indiciates the current Playing or Loop state of an input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'playing',
          choices: [
            { id: 'playing', label: 'Playing' },
            { id: 'loop', label: 'Loop' },
          ],
        },
      ],
      defaultStyle: {
        bgcolor: combineRgb(255, 0, 0),
      },
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (feedback.options.type === 'playing') {
          return input?.state === 'Running'
        } else {
          return input?.loop || false
        }
      },
    },

    // Util
    mixSelect: {
      type: 'boolean',
      name: 'Util - Mix Selected',
      description: 'Currently selected Mix',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
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
            { id: 15, label: '16' },
            { id: -2, label: 'Variable' },
          ],
        },
        options.mixVariable,
      ],
      callback: async (feedback, context) => {
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[
          instance.buttonShift.state
        ]
        mixVariable = parseInt(mixVariable, 10) - 1
        const mix: number = feedback.options.mix === -2 ? mixVariable : feedback.options.mix
        return instance.routingData.mix === mix
      },
    },

    busSelect: {
      type: 'boolean',
      name: 'Util - Bus Selected',
      description: 'Currently selected Bus',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: 'Master',
          choices: [{ id: 'Master', label: 'Master' }, ...AUDIOBUSSES.map((id) => ({ id, label: id }))],
        },
      ],
      callback: (feedback) => {
        return instance.routingData.bus === feedback.options.bus
      },
    },

    buttonShift: {
      type: 'boolean',
      name: 'Util - Button Shift state',
      description: 'Indicates Shift state',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 255, 0),
      },
      options: [],
      callback: () => {
        return instance.buttonShift.state !== 0
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
          useVariables: true,
        },
      ],
      callback: async (feedback, context) => {
        const textSplit = (await instance.parseOption(feedback.options.text, context))[instance.buttonShift.state]

        return { text: textSplit || undefined }
      },
    },
  }
}
