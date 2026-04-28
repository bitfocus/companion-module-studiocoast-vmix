import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type { EmptyOptions } from '../utils.js'
import type VMixInstance from '../index.js'

export type ScriptingActionsSchema = {
  command: CompanionActionSchema<{
    command: string
    encode: boolean
  }>
  scriptStart: CompanionActionSchema<{
    value: string
  }>
  scriptStop: CompanionActionSchema<{
    value: string
  }>
  scriptStopAll: EmptyOptions
}

export const getScriptingActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<ScriptingActionsSchema> => {
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
        const commandString = action.options.command
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
          useVariables: true,
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
          useVariables: true,
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
