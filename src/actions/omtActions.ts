import type { CompanionActionDefinitions } from '@companion-module/base'
import type { ActionFunctionsList, SendBasicCommand } from './actions.js'
import { type ActionSchema, options } from '../utils.js'
import type VMixInstance from '../index.js'

export type OMTActionsSchema = {
  omtPreview: ActionSchema<{
    input: string
    functionID: 'OMTPreviewOn' | 'OMTPreviewOff'
  }>
  omtSelectSource: ActionSchema<{
    input: string
    value: string
  }>
}

export const getOMTActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<OMTActionsSchema> => {
  return {
    omtPreview: {
      name: 'OMT - Preview Input',
      description: 'Changes the resolution of the OMT input to preview mode',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'AutoNext State',
          id: 'functionID',
          default: 'OMTPreviewOn',
          choices: [
            { id: 'OMTPreviewOn', label: 'Preview On' },
            { id: 'OMTPreviewOff', label: 'Preview Off' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: sendBasicCommand,
    },

    omtSelectSource: {
      name: 'OMT - Select Source',
      description: 'Select a source for an OMT Input by Name or Index',
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

        instance.tcp.sendCommand(`FUNCTION ${indexCheck ? 'OMTSelectSourceByIndex' : 'OMTSelectSourceByName'} Input=${input.key}&Value=${action.options.value}`)
      },
    },
  }
}

export const vMixOMTFunctions: ActionFunctionsList<OMTActionsSchema> = {
  omtPreview: ['OMTPreviewOn', 'OMTPreviewOff'],
  omtSelectSource: ['OMTSelectSourceByIndex', 'OMTSelectSourceByName'],
}
