import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import { AUDIOBUSSES } from '../utils.js'
import type VMixInstance from '../index.js'

export type UtilFeedbacksSchema = {
  mixSelect: {
    type: 'boolean'
    options: {
      mix: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
    }
  }
  busSelect: {
    type: 'boolean'
    options: {
      bus: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    }
  }
}

export const getUtilFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<UtilFeedbacksSchema> => {
  return {
    mixSelect: {
      type: 'boolean',
      name: 'Util - Mix Selected',
      description: 'Currently selected Mix',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [
        {
          type: 'dropdown',
          label: 'Mix',
          description: `1 to 16`,
          id: 'mix',
          default: 1,
          choices: [
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' },
            { id: 5, label: '5' },
            { id: 6, label: '6' },
            { id: 7, label: '7' },
            { id: 8, label: '8' },
            { id: 9, label: '9' },
            { id: 10, label: '10' },
            { id: 11, label: '11' },
            { id: 12, label: '12' },
            { id: 13, label: '13' },
            { id: 14, label: '14' },
            { id: 15, label: '15' },
            { id: 16, label: '16' },
          ],
        },
      ],
      callback: async (feedback) => {
        return instance.routingData.mix === feedback.options.mix
      },
    },

    busSelect: {
      type: 'boolean',
      name: 'Util - Bus Selected',
      description: 'Currently selected Bus',
      defaultStyle: { color: 0x000000, bgcolor: 0x0ffff00 },
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'bus',
          default: 'Master',
          choices: [{ id: 'Master', label: 'Master' }, ...AUDIOBUSSES.map((id) => ({ id, label: id }))],
          expressionDescription: `Valid Values: 'Master', 'A', 'B', 'C, 'D', 'E', 'F', 'G`,
        },
      ],
      callback: (feedback) => {
        return instance.routingData.bus === feedback.options.bus
      },
    },
  }
}
