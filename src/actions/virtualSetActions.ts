import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type VirtualSetActionsSchema = {
  virtualSet: CompanionActionSchema<{
    input: string
    value: '1' | '2' | '3' | '4'
  }>
}

export const getVirtualSetActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<VirtualSetActionsSchema> => {
  return {
    virtualSet: {
      name: 'VirtualSet - Zoom To Selected Preset',
      description: 'Zooms a Virtual Set to one of the presets',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Preset (1-4)',
          id: 'value',
          default: '1',
          choices: ['1', '2', '3', '4'].map((value) => ({ id: value, label: value })),
        },
      ],
      callback: async (action) => {
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SelectIndex Input=${encodeURIComponent(action.options.input)}&Value=${action.options.value}`)
      },
    },
  }
}

export const vMixVirtualSetFunctions: ActionFunctionsList<VirtualSetActionsSchema> = {
  virtualSet: ['SelectIndex'],
}
