import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type BrowserActionsSchema = {
  browser: CompanionActionSchema<{
    input: string
    functionID: 'BrowserReload' | 'BrowserBack' | 'BrowserForward' | 'BrowserKeyboardDisabled' | 'BrowserKeyboardEnabled' | 'BrowserMouseDisabled' | 'BrowserMouseEnabled'
  }>
  browserNavigate: CompanionActionSchema<{
    input: string
    value: string
    encode: boolean
  }>
}

export const getBrowserActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<BrowserActionsSchema> => {
  return {
    browser: {
      name: 'Browser - Functions',
      description: 'Browser control functions',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'BrowserReload',
          choices: [
            { id: 'BrowserReload', label: 'Reload' },
            { id: 'BrowserBack', label: 'Back' },
            { id: 'BrowserForward', label: 'Forward' },
            { id: 'BrowserKeyboardDisabled', label: 'Keyboard Disabled' },
            { id: 'BrowserKeyboardEnabled', label: 'Keyboard Enabled' },
            { id: 'BrowserMouseDisabled', label: 'Mouse Disabled' },
            { id: 'BrowserMouseEnabled', label: 'Mouse Enabled' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    browserNavigate: {
      name: 'Browser - Navigate',
      description: 'Navigate to specified URL (Any special characters may have to be escaped)',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'URL',
          id: 'value',
          default: '',
          useVariables: true,
        },
        {
          type: 'checkbox',
          label: 'URI encode function',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action) => {
        const value = action.options.value

        if (instance.tcp)
          return instance.tcp.sendCommand(`FUNCTION BrowserNavigate Input=${action.options.input}&Value=${action.options.encode ? encodeURIComponent(value) : value}`)
      },
    },
  }
}

export const vMixBrowserFunctions: ActionFunctionsList<BrowserActionsSchema> = {
  browser: ['BrowserReload', 'BrowserBack', 'BrowserForward', 'BrowserKeyboardDisabled', 'BrowserKeyboardEnabled', 'BrowserMouseDisabled', 'BrowserMouseEnabled'],
  browserNavigate: ['BrowserNavigate'],
}
