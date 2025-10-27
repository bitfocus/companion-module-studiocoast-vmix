import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import type { EmptyOptions } from '../utils'
import type VMixInstance from '../index'

type CommandOptions = {
  command: string
  encode: boolean
}

type ScriptStartOptions = {
  value: string
}

type ScriptStopOptions = {
  value: string
}

type ScriptStopAllOptions = EmptyOptions

type CommandCallback = ActionCallback<'command', CommandOptions>
type ScriptStartCallback = ActionCallback<'scriptStart', ScriptStartOptions>
type ScriptStopCallback = ActionCallback<'scriptStop', ScriptStopOptions>
type ScriptStopAllCallback = ActionCallback<'scriptStopAll', ScriptStopAllOptions>

export interface ScriptingActions {
  command: VMixAction<CommandCallback>
  scriptStart: VMixAction<ScriptStartCallback>
  scriptStop: VMixAction<ScriptStopCallback>
  scriptStopAll: VMixAction<ScriptStopAllCallback>

  [key: string]: VMixAction<any>
}

export type ScriptingCallbacks = CommandCallback | ScriptStartCallback | ScriptStopCallback | ScriptStopAllCallback

export const vMixScriptingActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): ScriptingActions => {
  return {
    command: {
      name: 'Scripting - Run custom command',
      description: 'Sends a vMix TCP "FUNCTION " message with the specified commands and values appended',
      options: [
        {
          type: 'textinput',
          label: 'Command',
          id: 'command',
          default: '',
          useVariables: { local: true },
        },
        {
          type: 'checkbox',
          label: 'URI encode function',
          id: 'encode',
          default: false,
        },
      ],
      callback: async (action, context) => {
        const commandString = (await instance.parseOption(action.options.command, context))[instance.buttonShift.state]
        const command = commandString.split(' ')[0]
        const params = commandString.split(' ').slice(1, commandString.split(' ').length).join(' ')
        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${command} ${action.options.encode ? encodeURIComponent(params) : params}`)
      },
    },

    scriptStart: {
      name: 'Scripting - Script start',
      description: 'Start a Script within vMix',
      options: [
        {
          type: 'textinput',
          label: 'Script name',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },

    scriptStop: {
      name: 'Scripting - Script stop',
      description: 'Stop a script within vMix',
      options: [
        {
          type: 'textinput',
          label: 'Script name',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      callback: sendBasicCommand,
    },

    scriptStopAll: {
      name: 'Scripting - Script stop all',
      description: 'Stop all scripts running in vMix',
      options: [],
      callback: sendBasicCommand,
    },
  }
}
