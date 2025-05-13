import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import { options } from '../utils'
import type VMixInstance from '../index'

type InputSelectedIndexOptions = {
  input: string
  selectedIndex: string
  fg: number
  bg: number
  et: number
  eb: number
}

type InputSelectedIndexBooleanOptions = {
  input: string
  selectedIndex: string
}

type InputSelectedIndexCallback = FeedbackCallback<'inputSelectedIndex', InputSelectedIndexOptions>
type InputSelectedIndexBooleanCallback = FeedbackCallback<'inputSelectedIndexBoolean', InputSelectedIndexBooleanOptions>

export interface ListFeedbacks {
  inputSelectedIndex: VMixFeedback<InputSelectedIndexCallback>
  inputSelectedIndexBoolean: VMixFeedback<InputSelectedIndexBooleanCallback>
}

export type ListCallbacks = InputSelectedIndexCallback | InputSelectedIndexBooleanCallback

export const vMixListFeedbacks = (instance: VMixInstance): ListFeedbacks => {
  return {
    inputSelectedIndex: {
      type: 'advanced',
      name: 'List - Change Colors Based On Selected Slide/Index/Virtual Set',
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
          default: combineRgb(0, 0, 0)
        },
        {
          type: 'colorpicker',
          label: 'Empty List Warning Background',
          id: 'eb',
          default: combineRgb(255, 255, 0)
        }
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
      }
    },

    inputSelectedIndexBoolean: {
      type: 'boolean',
      name: 'List - Change style based on an inputs Selected Index',
      description: '',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      options: [options.input, options.selectedIndex],
      callback: async (feedback, context) => {
        const inputOption = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
        const input = await instance.data.getInput(inputOption)
        const index = (await instance.parseOption(feedback.options.selectedIndex, context))[instance.buttonShift.state]

        return input?.selectedIndex === parseInt(index, 10)
      }
    }
  }
}
