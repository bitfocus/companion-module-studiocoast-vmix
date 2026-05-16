import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type NDIActionsSchema = {
  ndiCommand: CompanionActionSchema<{
    input: string
    value: string
  }>
  ndiSelectSource: CompanionActionSchema<{
    input: string
    value: string
  }>
  ndiRecording: CompanionActionSchema<{
    input: string
  }>
}

export const getNDIActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<NDIActionsSchema> => {
  return {
    ndiCommand: {
      name: 'NDI - Send Command',
      description: 'Send specified command to NDI source',
      options: [options.input],
      callback: sendBasicCommand,
    },

    ndiSelectSource: {
      name: 'NDI - Select Source',
      description: 'Select a source for an NDI Input by Name or Index',
      options: [
        options.input,
        {
          type: 'textinput',
          label: 'Name or Index',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (action) => {
        const input = await instance.data.getInput(action.options.input)

        if (input === null) return

        const indexCheck = parseInt(action.options.value)

        instance.tcp.sendCommand(`FUNCTION ${indexCheck ? 'NDISelectSourceByIndex' : 'NDISelectSourceByName'} Input=${input.key}&Value=${action.options.value}`)
      },
    },

    ndiRecording: {
      name: 'NDI - Recording',
      description: 'Start / Stop recording of an NDI Input',
      options: [options.input],
      callback: sendBasicCommand,
    },
  }
}

export const vMixNDIFunctions: ActionFunctionsList<NDIActionsSchema> = {
  ndiCommand: ['NDICommand'],
  ndiSelectSource: ['NDISelectSourceByIndex', 'NDISelectSourceByName'],
  ndiRecording: ['NDIStartRecording', 'NDIStopRecording'],
}
