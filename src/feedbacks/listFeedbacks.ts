import type { CompanionFeedbackSchema, CompanionFeedbackDefinitions } from '@companion-module/base'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type ListFeedbacksSchema = {
  inputSelectedIndex: CompanionFeedbackSchema<{
    input: string
    selectedIndex: string
    fg: number
    bg: number
    et: number
    eb: number
  }>
  inputSelectedIndexBoolean: CompanionFeedbackSchema<{
    input: string
    selectedIndex: string
  }>
}

export const getListFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<ListFeedbacksSchema> => {
  return {
    inputSelectedIndex: {
      type: 'advanced',
      name: 'List - Selected Index (Advanced)',
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
          default: 0x000000,
        },
        {
          type: 'colorpicker',
          label: 'Empty List Warning Background',
          id: 'eb',
          default: 0x0ffff00,
        },
      ],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)
        const index = feedback.options.selectedIndex

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
      name: 'List - Selected Index',
      description: '',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [options.input, options.selectedIndex],
      callback: async (feedback) => {
        const inputOption = feedback.options.input
        const input = await instance.data.getInput(inputOption)
        const index = feedback.options.selectedIndex

        return input?.selectedIndex === parseInt(index, 10)
      },
    },
  }
}
