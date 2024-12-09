import { combineRgb } from '@companion-module/base'
import { VMixFeedback, FeedbackCallback } from './feedback'
import { options } from '../utils'
import VMixInstance from '../index'

type InputStateOptions = {
  type: 'playing' | 'loop'
  input: string
}

type VideoTimerOptions = {
  input: string
  color: number
  color30: number
  color10: number
  loop: boolean
}

type InputStateCallback = FeedbackCallback<'inputState', InputStateOptions>
type VideoTimerCallback = FeedbackCallback<'videoTimer', VideoTimerOptions>

/*
type InputLoopOptions = {
  input: string
}
type InputLoopCallback = FeedbackCallback<'inputLoop', InputLoopOptions>*/

export interface MediaFeedbacks {
  inputState: VMixFeedback<InputStateCallback>
  videoTimer: VMixFeedback<VideoTimerCallback>
  //inputLoop: VMixFeedback<InputLoopCallback>
}

export type MediaCallbacks = InputStateCallback | VideoTimerCallback
//| InputLoopCallback

export const vMixMediaFeedbacks = (instance: VMixInstance): MediaFeedbacks => {
  return {
    /*
    inputLoop: {
      type: 'boolean',
      name: 'Media - Input Loop',
      description: 'Input Loop Status',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      options: [options.input],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        return input?.loop || false
      }
    },*/

    inputState: {
      type: 'boolean',
      name: 'Media - Input Playing/Loop',
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
            { id: 'loop', label: 'Loop' }
          ]
        }
      ],
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)

        if (feedback.options.type === 'playing') {
          return input?.state === 'Running'
        } else {
          return input?.loop || false
        }
      }
    },

    videoTimer: {
      type: 'advanced',
      name: 'Media - Video Timer',
      description: 'Indicate time remaining on video input',
      options: [
        options.input,
        {
          type: 'colorpicker',
          label: 'Text color',
          id: 'color',
          default: combineRgb(255, 255, 255)
        },
        {
          type: 'colorpicker',
          label: 'Text color under 30s',
          id: 'color30',
          default: combineRgb(255, 255, 0)
        },
        {
          type: 'colorpicker',
          label: 'Text color under 10s',
          id: 'color10',
          default: combineRgb(255, 0, 0)
        },
        {
          type: 'checkbox',
          label: 'Disable color change if looping',
          id: 'loop',
          default: false
        }
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
      }
    }
  }
}
