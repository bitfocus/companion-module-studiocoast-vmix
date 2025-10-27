import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import type VMixInstance from '../index'

type KeyPressOptions = {
  value: string
}

type TbarOptions = {
  value: string
}

type DynamicOptions = {
  type: 'Input' | 'Value'
  number: '1' | '2' | '3' | '4'
  value: string
}

type KeyPressCallback = ActionCallback<'keyPress', KeyPressOptions>
type TbarCallback = ActionCallback<'tbar', TbarOptions>
type DynamicCallback = ActionCallback<'dynamic', DynamicOptions>

export interface GeneralActions {
  keyPress: VMixAction<KeyPressCallback>
  tbar: VMixAction<TbarCallback>
  dynamic: VMixAction<DynamicCallback>

  [key: string]: VMixAction<any>
}

export type GeneralCallbacks = KeyPressCallback | TbarCallback | DynamicCallback

export const vMixGeneralActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): GeneralActions => {
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
          useVariables: { local: true },
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
          label: 'postion 0-255',
          id: 'value',
          default: '0',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

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
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: async (action, context) => {
        const value = (await instance.parseOption(action.options.value, context))[instance.buttonShift.state]

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetDynamic${action.options.type}${action.options.number} Value=${value}`)
      },
    },
  }
}
