import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type PresetActionsSchema = {
  presetFunctions: CompanionActionSchema<{
    functionID: 'SavePreset' | 'OpenPreset' | 'LastPreset'
    value: string
  }>
}
export const getPresetActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<PresetActionsSchema> => {
  return {
    presetFunctions: {
      name: 'Preset - Save / Open / Last Preset',
      description: '',
      options: [
        {
          type: 'dropdown',
          label: 'Save / Open / Last',
          id: 'functionID',
          default: 'SavePreset',
          choices: [
            { id: 'SavePreset', label: 'Save' },
            { id: 'OpenPreset', label: 'Open' },
            { id: 'LastPreset', label: 'Last' },
          ],
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'Filename',
          id: 'value',
          default: '',
          isVisibleExpression: `$(options:functionID) !== 'LastPreset'`,
        },
      ],
      callback: async (action) => {
        instance.tcp.sendCommand(`FUNCTION ${action.options.functionID}${action.options.functionID !== 'LastPreset' ? ` Value=${action.options.value}` : ''}`)
      },
    },
  }
}

export const vMixPresetFunctions: ActionFunctionsList<PresetActionsSchema> = {
  presetFunctions: ['SavePreset', 'OpenPreset', 'LastPreset'],
}
