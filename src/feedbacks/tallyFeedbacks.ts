import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { graphics } from 'companion-module-utils'
import type { Input } from '../data.js'
import { type MixOptionEntry, options } from '../utils.js'
import type VMixInstance from '../index.js'

export type TallyFeedbacksSchema = {
  inputPreview: {
    type: 'advanced'
    options: {
      input: string
      mix: MixOptionEntry
      fg: number
      bg: number
      tally: TallySelection
    }
  }
  inputLive: {
    type: 'advanced'
    options: {
      input: string
      mix: MixOptionEntry
      fg: number
      bg: number
      tally: TallySelection
    }
  }
  overlayStatus: {
    type: 'advanced'
    options: {
      input: string
      overlay: string
      fg: number
      bgPreview: number
      bgProgram: number
    }
  }
}
export type TallySelection = '' | 'border' | 'cornerTL' | 'cornerTR' | 'cornerBL' | 'cornerBR' | 'full'

export const getTallyFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<TallyFeedbacksSchema> => {
  return {
    inputPreview: {
      type: 'advanced',
      name: 'Tally - Preview state',
      description: 'Indicates if an input is in Preview (or is a layer of an input that is if layer tally is selected)',
      options: [options.input, options.mixSelect, options.foregroundColor, options.backgroundColorPreview, options.layerTallyIndicator],
      callback: async (feedback) => {
        let mix = feedback.options.mix
        if (mix === 'Selected') mix = instance.routingData.mix + 1

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

        const input = await instance.data.getInput(feedback.options.input)
        const inputState = checkInput(input)

        if (inputState === 1) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (inputState === 2) {
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
            imageBuffer: indicator ? Buffer.from(indicator).toString('base64') : undefined,
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
      options: [options.input, options.mixSelect, options.foregroundColor, options.backgroundColorProgram, options.layerTallyIndicator],
      callback: async (feedback) => {
        let mix = feedback.options.mix
        if (mix === 'Selected') mix = instance.routingData.mix + 1

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

        const input = await instance.data.getInput(feedback.options.input)
        const inputState = checkInput(input)

        if (inputState === 1) {
          return { color: feedback.options.fg, bgcolor: feedback.options.bg }
        } else if (inputState === 2) {
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
            imageBuffer: indicator ? Buffer.from(indicator).toString('base64') : undefined,
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
          expressionDescription: `Valid Values: 'Any', '1', '2', '3', '4', '5', '6', '7', '8', 'Stinger 1', 'Stinger 2', 'Stinger 3', 'Stinger 4', 'Stinger 5', 'Stinger 6', 'Stinger 7', 'Stinger 8'`,
        },
        options.foregroundColor,
        {
          type: 'colorpicker',
          label: 'Preview Background Color',
          id: 'bgPreview',
          default: 0x00ff00,
        },
        {
          type: 'colorpicker',
          label: 'Program Background Color',
          id: 'bgProgram',
          default: 0xff0000,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        let preview = false
        let program = false

        instance.data.overlays.forEach((overlay) => {
          const overlayNumberCheck = overlay.number === parseInt(feedback.options.overlay, 10) || feedback.options.overlay === '0'
          const overlayInputCheck = overlay.input === input?.number || (feedback.options.input === '' && overlay.input !== null)

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
