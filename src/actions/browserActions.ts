import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type BrowserOptions = {
  input: string
  functionID: 'BrowserReload' | 'BrowserBack' | 'BrowserForward' | 'BrowserKeyboardDisabled' | 'BrowserKeyboardEnabled' | 'BrowserMouseDisabled' | 'BrowserMouseEnabled'
}

type BrowserNavigateOptions = {
  input: string
  value: string
  encode: boolean
}

type BrowserCallback = ActionCallback<'browser', BrowserOptions>
type BrowserNavigateCallback = ActionCallback<'browserNavigate', BrowserNavigateOptions>

export interface BrowserActions {
  browser: VMixAction<BrowserCallback>
  browserNavigate: VMixAction<BrowserNavigateCallback>

  [key: string]: VMixAction<any>
}

export type BrowserCallbacks = BrowserCallback | BrowserNavigateCallback

export const vMixBrowserActions = (instance: VMixInstance, sendBasicCommand: (action: Readonly<BrowserCallbacks>) => Promise<void>): BrowserActions => {
  return {
    browser: {
      name: 'Browser - Functions',
      description: 'Browser contol functions',
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
            { id: 'BrowserMouseEnabled', label: 'Mouse Enabled' }
          ]
        }
      ],
      callback: sendBasicCommand
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
          useVariables: true
        },
        {
          type: 'checkbox',
          label: 'URI encode function',
          id: 'encode',
          default: false
        }
      ],
      callback: async (action) => {
        const value = (await instance.parseOption(action.options.value))[instance.buttonShift.state]

        if (instance.tcp) instance.tcp.sendCommand(`FUNCTION BrowserNavigate Input=${action.options.input}&Value=${action.options.encode ? encodeURIComponent(value) : value}`)
      }
    }
  }
}
