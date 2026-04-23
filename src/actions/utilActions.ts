import type { CompanionActionDefinitions } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type UtilActionsSchema = {
  mixSelect: {
    options: {
      mix: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
    }
  }
  busSelect: {
    options: {
      value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
    }
  }
}

export const getUtilActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<UtilActionsSchema> => {
  return {
    mixSelect: {
      name: 'Util - Select Mix',
      description: 'Select a Mix for use with other Companion actions as the mix_selected variable',
      options: [
        {
          type: 'dropdown',
          label: 'Mix',
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
          expressionDescription: `Valid Values: 1 to 16`,
        },
      ],
      callback: async (action) => {
        const mix = (action.options.mix - 1) as typeof instance.routingData.mix

        instance.routingData.mix = mix
        instance.variables?.set({ mix_selected: action.options.mix + 1 })

        instance.variables?.updateVariables()
        instance.checkFeedbacks('mixSelect', 'inputPreview', 'inputLive')
      },
    },

    busSelect: {
      name: 'Util - Select Bus',
      description: 'Select a Bus for use with other Companion actions',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'value',
          default: 'Master',
          choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id })),
          expressionDescription: `Valid Values: 'Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'`,
        },
      ],
      callback: (action) => {
        instance.routingData.bus = action.options.value
        instance.variables?.updateVariables()
        instance.checkFeedbacks('busSelect', 'busMute', 'busSolo', 'busSendToMaster', 'busVolumeMeter', 'inputBusRouting', 'liveBusVolume')
      },
    },
  }
}
