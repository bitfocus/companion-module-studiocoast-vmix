import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'

export type GeneralActionsSchema = {
  keyPress: CompanionActionSchema<{
    value: string
  }>
  tbar: CompanionActionSchema<{
    value: string
  }>
  dynamic: CompanionActionSchema<{
    type: 'Input' | 'Value'
    number: '1' | '2' | '3' | '4'
    value: string
  }>
}

export const getGeneralActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<GeneralActionsSchema> => {
  return {
    keyPress: {
      name: 'General - KeyPress',
      description: 'Send a key press to vMix',
      options: [
        {
          type: 'textinput',
          label: 'Key',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    tbar: {
      name: 'General - Set t-bar position',
      description: 'Sets the TBar to the specified position',
      options: [
        {
          type: 'textinput',
          label: 'postion',
          description: '0 to 255',
          id: 'value',
          default: '0',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const value = action.options.value

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION SetFader Value=${value}`)
        }
      },
    },

    dynamic: {
      name: 'General - Set Dynamic Inputs and Values',
      description: 'Sets an input or value to the specified Dynamic Input or Dynamic Value',
      options: [
        {
          type: 'dropdown',
          label: 'Select Type',
          id: 'type',
          default: 'Input',
          choices: [
            { id: 'Input', label: 'Dynamic Input' },
            { id: 'Value', label: 'Dynamic Value' },
          ],
          expressionDescription: `Valid Values: 'Input', 'Value'`,
        },
        {
          type: 'dropdown',
          label: 'Select Number',
          id: 'number',
          default: '1',
          choices: [
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
          ],
          expressionDescription: `Valid Values: 1 to 4`,
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const value = action.options.value

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetDynamic${action.options.type}${action.options.number} Value=${value}`)
      },
    },
  }
}
