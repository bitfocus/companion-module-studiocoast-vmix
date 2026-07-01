import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'
import type { EmptyOptions } from 'src/utils.js'

export type GeneralActionsSchema = {
  keyPress: CompanionActionSchema<{
    value: string
  }>
  sendKeys: CompanionActionSchema<{
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
  activatorRefresh: EmptyOptions
  callManagerShowHide: EmptyOptions
  vMixConnection: CompanionActionSchema<{
    type: 'Connect' | 'Disconnect' | 'Reconnect'
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
          description: 'Send a single key press to vMix',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: sendBasicCommand,
    },

    sendKeys: {
      name: 'General - Send keys',
      description: 'Send multiple key presses to vMix',
      options: [
        {
          type: 'textinput',
          label: 'Key',
          description: 'Comma separated list of keys to send ot vMIx',
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

        return instance.tcp.sendCommand(`FUNCTION SetFader Value=${value}`)
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

        return instance.tcp.sendCommand(`FUNCTION SetDynamic${action.options.type}${action.options.number} Value=${value}`)
      },
    },

    activatorRefresh: {
      name: 'General - Activator Refresh',
      description: 'Refresh all activator device lights and controls',
      options: [],
      callback: sendBasicCommand,
    },

    callManagerShowHide: {
      name: 'General - Toggle Call Manager',
      description: '',
      options: [],
      callback: sendBasicCommand,
    },

    vMixConnection: {
			name: 'General - vMix Connection',
			description: 'Connect/disconnect/Reconnect to a vMix server',
			options: [
        {
          type: 'dropdown',
          label: 'Connect / Disconnect / Reconnect',
          id: 'type',
          default: 'Connect',
          choices: [
            { id: 'Connect', label: 'Connect' },
            { id: 'Disconnect', label: 'Disconnect' },
            { id: 'Reconnect', label: 'Reconnect' },
          ],
          expressionDescription: `Valid Values: 'Connect','Disconnect', or'Reconnect'`,
        },
			],
			callback: (action) => {
				if (action.options.type === 'Connect') {
					instance.tcp.update(true)
				}
				if (action.options.type === 'Disconnect') {
					instance.tcp.destroy()
				}
				if (action.options.type === 'Reconnect') {
					instance.tcp.destroy()
					instance.tcp.update(true)
				}
			}
		},
  }
}

export const vMixGeneralFunctions: ActionFunctionsList<GeneralActionsSchema> = {
  keyPress: ['KeyPress'],
  sendKeys: ['SendKeys'],
  tbar: ['SetFader'],
  dynamic: ['SetDynamicInput1', 'SetDynamicValue1', 'SetDynamicInput2', 'SetDynamicValue2', 'SetDynamicInput3', 'SetDynamicValue3', 'SetDynamicInput4', 'SetDynamicValue4'],
  activatorRefresh: ['ActivatorRefresh'],
  callManagerShowHide: ['CallManagerShowHide'],
	vMixConnection: [],
}
