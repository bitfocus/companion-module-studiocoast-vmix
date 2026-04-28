import type { CompanionFeedbackSchema } from '@companion-module/base'
import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type PlaybackFeedbacksSchema = {
  inputState: CompanionFeedbackSchema<{
    type: 'playing' | 'loop'
    input: string
  }>
  videoTimer: CompanionFeedbackSchema<{
    input: string
    color: number
    color30: number
    color10: number
    loop: boolean
  }>
}

export const getPlaybackFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<PlaybackFeedbacksSchema> => {
  return {
    inputState: {
      type: 'boolean',
      name: 'Playback - Input Playing/Loop',
      description: 'Indicates the current Playing or Loop state of an input',
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
          expressionDescription: `Valid Values: 'playing', 'loop'`,
        },
      ],
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)

        if (feedback.options.type === 'playing') {
          return input?.state === 'Running'
        } else {
          return input?.loop || false
        }
      },
    },

    videoTimer: {
      type: 'advanced',
      name: 'Playback - Video Timer',
      description: 'Indicate time remaining on video input',
      options: [
        options.input,
        {
          type: 'colorpicker',
          label: 'Text color',
          id: 'color',
          default: 0x0ffffff,
        },
        {
          type: 'colorpicker',
          label: 'Text color under 30s',
          id: 'color30',
          default: 0x0ffff00,
        },
        {
          type: 'colorpicker',
          label: 'Text color under 10s',
          id: 'color10',
          default: 0xff0000,
        },
        {
          type: 'checkbox',
          label: 'Disable color change if looping',
          id: 'loop',
          default: false,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
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
  }
}
