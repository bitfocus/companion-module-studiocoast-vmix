import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import { AUDIOBUSSES, type EmptyOptions, options } from '../utils'
import type VMixInstance from '../index'

type MixSelectOptions = {
  mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -2
  mixVariable: string
}

type BusSelectOptions = {
  bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
}

type ButtonShiftOptions = EmptyOptions

type ButtonTextOptions = {
  text: string
}

type MixSelectCallback = FeedbackCallback<'mixSelect', MixSelectOptions>
type BusSelectCallback = FeedbackCallback<'busSelect', BusSelectOptions>
type ButtonShiftCallback = FeedbackCallback<'buttonShift', ButtonShiftOptions>
type ButtonTextCallback = FeedbackCallback<'buttonText', ButtonTextOptions>

export interface UtilFeedbacks {
  mixSelect: VMixFeedback<MixSelectCallback>
  busSelect: VMixFeedback<BusSelectCallback>
  buttonShift: VMixFeedback<ButtonShiftCallback>
  buttonText: VMixFeedback<ButtonTextCallback>
}

export type UtilCallbacks = MixSelectCallback | BusSelectCallback | ButtonShiftCallback | ButtonTextCallback

export const vMixUtilFeedbacks = (instance: VMixInstance): UtilFeedbacks => {
  return {
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
        let mixVariable: string | number = (await instance.parseOption(feedback.options.mixVariable, context))[instance.buttonShift.state]
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
          useVariables: { local: true },
        },
      ],
      callback: async (feedback, context) => {
        const textSplit = (await instance.parseOption(feedback.options.text, context))[instance.buttonShift.state]

        return { text: textSplit || undefined }
      },
    },
  }
}
