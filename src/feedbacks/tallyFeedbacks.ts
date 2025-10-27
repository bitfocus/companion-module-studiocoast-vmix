import { combineRgb } from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import type { Input } from '../data'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import { type MixOptionEntry, options } from '../utils'
import type VMixInstance from '../index'

export type TallySelection = '' | 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR' | 'full'

type InputPreviewOptions = {
  input: string
  mix: MixOptionEntry
  mixVariable: string
  fg: number
  bg: number
  tally: TallySelection
}

type InputLiveOptions = {
  input: string
  mix: MixOptionEntry
  mixVariable: string
  fg: number
  bg: number
  tally: TallySelection
}

type OverlayStatusOptions = {
  input: string
  overlay: string
  fg: number
  bgPreview: number
  bgProgram: number
}

type InputPreviewCallback = FeedbackCallback<'inputPreview', InputPreviewOptions>
type InputLiveCallback = FeedbackCallback<'inputLive', InputLiveOptions>
type OverlayStatusCallback = FeedbackCallback<'overlayStatus', OverlayStatusOptions>

export interface TallyFeedbacks {
  inputPreview: VMixFeedback<InputPreviewCallback>
  inputLive: VMixFeedback<InputLiveCallback>
  overlayStatus: VMixFeedback<OverlayStatusCallback>
}

export type TallyCallbacks = InputPreviewCallback | InputLiveCallback | OverlayStatusCallback

export const vMixTallyFeedbacks = (instance: VMixInstance): TallyFeedbacks => {
  return {
    inputPreview: {
      type: 'advanced',
      name: 'Tally - Preview state',
      description: 'Indicates if an input is in Preview (or is a layer of an input that is if layer tally is selected)',
      options: [options.input, options.mixSelect, options.mixVariable, options.foregroundColor, options.backgroundColorPreview, options.layerTallyIndicator],
      callback: async (feedback, context) => {
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = feedback.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

        // Check if an input is not in preview at all (0), currently in preview (1), or in preview as a layer (2)
        const checkInput = (input: Input | null): 0 | 1 | 2 => {
          if (input === null || instance.data.mix[mix].preview === 0 || !instance.data.inputs[instance.data.mix[mix].preview - 1]) {
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
        optionsInput = await Promise.all(optionsInput.map(async (value: any) => instance.data.getInput(value)))
        optionsInput = optionsInput.map(checkInput)

        if (optionsInput[instance.buttonShift.state] === 1 || (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)) {
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
      options: [options.input, options.mixSelect, options.mixVariable, options.foregroundColor, options.backgroundColorProgram, options.layerTallyIndicator],
      callback: async (feedback, context) => {
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[instance.buttonShift.state]
        mixVariable = parseInt(mixVariable, 10) - 1

        let mix: number = feedback.options.mix
        if (mix === -1) mix = instance.routingData.mix
        if (mix === -2) mix = mixVariable

        // Check if an input is not in program at all (0), currently in program (1), or in program as a layer (2)
        const checkInput = (input: Input | null): 0 | 1 | 2 => {
          if (input === null || instance.data.mix[mix].program === 0 || !instance.data.inputs[instance.data.mix[mix].program - 1]) {
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
        optionsInput = await Promise.all(optionsInput.map(async (value: any) => instance.data.getInput(value)))
        optionsInput = optionsInput.map(checkInput)

        if (optionsInput[instance.buttonShift.state] === 1 || (optionsInput.includes(1) && instance.config.shiftBlinkPrvPrgm && instance.buttonShift.blink)) {
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
          choices: ['Any', '1', '2', '3', '4', '5', '6', '7', '8', 'Stinger 1', 'Stinger 2', 'Stinger 3', 'Stinger 4', 'Stinger 5', 'Stinger 6', 'Stinger 7', 'Stinger 8'].map(
            (id, index) => ({
              id: index.toString(),
              label: id,
            }),
          ),
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
        inputOptions = await Promise.all(inputOptions.map(async (value: any) => instance.data.getInput(value)))
        inputOptions = inputOptions.map((input: Input | null) => (input !== null ? input.number : null))

        let preview = false
        let program = false

        instance.data.overlays.forEach((overlay) => {
          const overlayNumberCheck = overlay.number === parseInt(feedback.options.overlay, 10) || feedback.options.overlay === '0'
          const overlayInputCheck =
            (overlay.input === inputOptions[instance.buttonShift.state] && inputOptions[instance.buttonShift.state] !== null) ||
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
  }
}
