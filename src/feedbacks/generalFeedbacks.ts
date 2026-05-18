import type { CompanionFeedbackSchema, CompanionFeedbackDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type GeneralFeedbacksSchema = {
  dynamic: CompanionFeedbackSchema<{
    type: 'dynamicInput' | 'dynamicValue'
    number: number
    value: string
  }>
  outputStatus: CompanionFeedbackSchema<{
    output: 'Fullscreen 1' | 'FUllscreen 2' | 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4'
    type: 'Output' | 'Preview' | 'MultiView' | 'MultiView2' | 'Replay' | 'Mix' | 'Input'
    mix: string
    input: string
  }>
  outputNDISRT: CompanionFeedbackSchema<{
    output: 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4'
    type: 'ndi' | 'omt' | 'srt'
  }>
  status: CompanionFeedbackSchema<{
    status: 'connection' | 'fadeToBlack' | 'recording' | 'external' | 'streaming' | 'multiCorder' | 'fullscreen' | 'playList'
    value: '' | '0' | '1' | '2'
  }>
}

export const getGeneralFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<GeneralFeedbacksSchema> => {
  return {
    dynamic: {
      type: 'boolean',
      name: 'General - Dynamic Input or Value',
      description: 'Check if a Dynamic Input or Value matches a specified value',
      options: [
        {
          type: 'dropdown',
          label: 'Select Type',
          id: 'type',
          default: 'dynamicInput',
          choices: [
            { id: 'dynamicInput', label: 'Dynamic Input' },
            { id: 'dynamicValue', label: 'Dynamic Value' },
          ],
          expressionDescription: `Valid Values: 'dynamicInput', 'dynamicValue'`,
        },
        {
          type: 'dropdown',
          label: 'Select Number',
          id: 'number',
          default: '1',
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
          ],
          expressionDescription: `Valid Values: 0 to 3`,
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: true,
        },
      ],
      defaultStyle: { bgcolor: 0xff0000 },
      callback: async (feedback) => {
        const targetValue = feedback.options.value
        const dynamic: string = instance.data[feedback.options.type][feedback.options.number]?.value

        return targetValue === dynamic
      },
    },

    outputStatus: {
      type: 'boolean',
      name: 'General - Output Status',
      description: 'Requires vMix 28+',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        {
          type: 'dropdown',
          label: 'Output',
          id: 'output',
          default: 'Fullscreen 1',
          choices: [
            { id: 'Fullscreen 1', label: 'Fullscreen 1' },
            { id: 'Fullscreen 2', label: 'Fullscreen 2' },
            { id: 'Output 1', label: 'Output 1' },
            { id: 'Output 2', label: 'Output 2' },
            { id: 'Output 3', label: 'Output 3' },
            { id: 'Output 4', label: 'Output 4' },
            { id: 'Custom', label: 'Use Variable' },
          ],
          expressionDescription: `Valid Values: 'Fullscreen 1', 'Fullscreen 2', 'Output 1', 'Output 2', 'Output 3', 'Output 4'`,
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'Output',
          choices: [
            { id: 'Output', label: 'Output' },
            { id: 'Preview', label: 'Preview' },
            { id: 'MultiView', label: 'MultiView' },
            { id: 'MultiView2', label: 'MultiView2' },
            { id: 'Replay', label: 'Replay' },
            { id: 'Mix', label: 'Mix' },
            { id: 'Input', label: 'Input' },
          ],
          expressionDescription: `Valid Values: 'Output', 'Preview', 'MultiView', 'MultiView2', 'Replay', 'Mix', 'Input'`,
        },
        {
          type: 'textinput',
          label: 'Mix',
          description: 'Only if Type is set to Mix',
          id: 'mix',
          default: '',
          useVariables: true,
        },
        {
          type: 'textinput',
          label: 'Input',
          description: 'Only if Type is set to Input',
          id: 'input',
          default: '',
          useVariables: true,
        },
      ],
      callback: async (feedback) => {
        const outputSelect = feedback.options.output
        const outputType = outputSelect.startsWith('Fullscreen') ? 'fullscreen' : 'output'
        const outputNumber = parseInt(outputSelect[outputSelect.length - 1])

        if (isNaN(outputNumber)) return false

        const output = instance.data.outputs.find((x) => {
          return x.type === outputType && x.number === outputNumber
        })

        if (!output) return false

        if (feedback.options.type === 'Mix' && output.source === 'Mix') {
          const mix = feedback.options.mix
          return output.mix + 1 === parseInt(mix, 10)
        } else if (feedback.options.type === 'Input' && output.source === 'Input') {
          const inputSelect = feedback.options.input
          const input = await instance.data.getInput(inputSelect)
          return input ? input.number === output.input : false
        } else {
          return output.source === feedback.options.type
        }
      },
    },

    outputNDISRT: {
      type: 'boolean',
      name: 'General - Output NDI/OMT/SRT Status',
      description: 'Requires vMix 28+',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        {
          type: 'dropdown',
          label: 'Output',
          id: 'output',
          default: 'Output 1',
          choices: [
            { id: 'Output 1', label: 'Output 1' },
            { id: 'Output 2', label: 'Output 2' },
            { id: 'Output 3', label: 'Output 3' },
            { id: 'Output 4', label: 'Output 4' },
          ],
          expressionDescription: `Valid Values: 'Output 1', 'Output 2', 'Output 3', 'Output 4'`,
        },
        {
          type: 'dropdown',
          label: 'Type',
          id: 'type',
          default: 'ndi',
          choices: [
            { id: 'ndi', label: 'NDI' },
            { id: 'omt', label: 'OMT' },
            { id: 'srt', label: 'SRT' },
          ],
          expressionDescription: `Valid Values: 'ndi', 'omt', 'srt'`,
        },
      ],
      callback: async (feedback) => {
        const outputSelect = feedback.options.output
        const outputNumber = parseInt(outputSelect[outputSelect.length - 1])
        if (isNaN(outputNumber)) return false

        const output = instance.data.outputs.find((x) => {
          return x.type === 'output' && x.number === outputNumber
        })

        if (!output) return false
        return output[feedback.options.type]
      },
    },

    status: {
      type: 'boolean',
      name: 'General - vMix Status',
      description: 'Current status of vMix, such as recording, external, etc...',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        {
          type: 'dropdown',
          label: 'Status Type',
          id: 'status',
          default: 'connection',
          choices: ['connection', 'fadeToBlack', 'recording', 'external', 'streaming', 'multiCorder', 'fullscreen', 'playList'].map((id) => ({ id, label: id })),
          disableAutoExpression: true,
        },
        {
          type: 'dropdown',
          label: 'Stream Feedback Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'Any' },
            { id: '0', label: '1' },
            { id: '1', label: '2' },
            { id: '2', label: '3' },
            { id: '3', label: '4' },
            { id: '4', label: '5' },
          ],
          isVisibleExpression: `$(options:status) === 'streaming'`,
          disableAutoExpression: true,
        },
      ],
      callback: (feedback) => {
        if (feedback.options.status === 'connection') {
          if (instance.connected) return true
        } else {
          if (instance.data.status !== undefined) {
            if (feedback.options.status === 'streaming') {
              const anyStream = feedback.options.value === '' && instance.data.status.stream.includes(true)
              const specificStream = instance.data.status.stream[parseInt(feedback.options.value, 10)]
              if (anyStream || specificStream) return true
            } else {
              if (instance.data.status[feedback.options.status]) return true
            }
          }
        }
        return false
      },
    },
  }
}
