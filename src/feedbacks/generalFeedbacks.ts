import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import type VMixInstance from '../index'

type DynamicOptions = {
  type: 'dynamicInput' | 'dynamicValue'
  number: number
  value: string
}

interface OutputStatusOptions {
  output: 'Fullscreen 1' | 'FUllscreen 2' | 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4' | 'Custom'
  custom: string
  type: 'Output' | 'Preview' | 'MultiView' | 'MultiView2' | 'Replay' | 'Mix' | 'Input'
  mix: string
  input: string
}
interface OutputNDISRTOptions {
  output: 'Output 1' | 'Output 2' | 'Output 3' | 'Output 4' | 'Custom'
  custom: string
  type: 'ndi' | 'omt' | 'srt'
}

type StatusOptions = {
  status: 'connection' | 'fadeToBlack' | 'recording' | 'external' | 'streaming' | 'multiCorder' | 'fullscreen' | 'playList'
  value: '' | '0' | '1' | '2'
}

type DynamicCallback = FeedbackCallback<'dynamic', DynamicOptions>
type OutputStatusCallback = FeedbackCallback<'outputStatus', OutputStatusOptions>
type OutputNDISRTCallback = FeedbackCallback<'outputNDISRT', OutputNDISRTOptions>
type StatusCallback = FeedbackCallback<'status', StatusOptions>

export interface GeneralFeedbacks {
  dynamic: VMixFeedback<DynamicCallback>
  outputStatus: VMixFeedback<OutputStatusCallback>
  outputNDISRT: VMixFeedback<OutputNDISRTCallback>
  status: VMixFeedback<StatusCallback>
}

export type GeneralCallbacks = DynamicCallback | OutputStatusCallback | OutputNDISRTCallback | StatusCallback

export const vMixGeneralFeedbacks = (instance: VMixInstance): GeneralFeedbacks => {
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
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: { local: true },
        },
      ],
      defaultStyle: {
        bgcolor: combineRgb(255, 0, 0),
      },
      callback: async (feedback, context) => {
        const targetValue = (await instance.parseOption(feedback.options.value, context))[instance.buttonShift.state]
        const dynamic: string = instance.data[feedback.options.type][feedback.options.number]?.value

        return targetValue === dynamic
      },
    },

    outputStatus: {
      type: 'boolean',
      name: 'General - Output Status',
      description: 'Requires vMix 28+',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
        },
        {
          type: 'textinput',
          label: 'Output by Variable',
          id: 'custom',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.output === 'Custom',
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
        },
        {
          type: 'textinput',
          label: 'Mix (1 to 16)',
          id: 'mix',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.type === 'Mix',
        },
        {
          type: 'textinput',
          label: 'Input',
          id: 'input',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.type === 'Input',
        },
      ],
      callback: async (feedback, context) => {
        const outputSelect: any =
          feedback.options.output === 'Custom' ? (await instance.parseOption(feedback.options.custom, context))[instance.buttonShift.state] : feedback.options.output
        if (!['Fullscreen 1', 'Fullscreen 2', 'Output 1', 'Output 2', 'Output 3', 'Output 4'].includes(outputSelect)) return false
        const outputType = outputSelect.startsWith('Fullscreen') ? 'fullscreen' : 'output'
        const outputNumber = parseInt(outputSelect[outputSelect.length - 1])
        if (isNaN(outputNumber)) return false
        const output = instance.data.outputs.find((x) => {
          return x.type === outputType && x.number === outputNumber
        })
        if (!output) return false
        if (feedback.options.type === 'Mix' && output.source === 'Mix') {
          const mix = (await instance.parseOption(feedback.options.mix, context))[instance.buttonShift.state]
          return output.mix + 1 === parseInt(mix, 10)
        } else if (feedback.options.type === 'Input' && output.source === 'Input') {
          const inputSelect = (await instance.parseOption(feedback.options.input, context))[instance.buttonShift.state]
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
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
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
            { id: 'Custom', label: 'Use Variable' },
          ],
        },
        {
          type: 'textinput',
          label: 'Output by Variable',
          id: 'custom',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.output === 'Custom',
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
        },
      ],
      callback: async (feedback, context) => {
        const outputSelect: any =
          feedback.options.output === 'Custom' ? (await instance.parseOption(feedback.options.custom, context))[instance.buttonShift.state] : feedback.options.output
        if (!['Output 1', 'Output 2', 'Output 3', 'Output 4'].includes(outputSelect)) return false
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
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'dropdown',
          label: 'Status Type',
          id: 'status',
          default: 'connection',
          choices: ['connection', 'fadeToBlack', 'recording', 'external', 'streaming', 'multiCorder', 'fullscreen', 'playList'].map((id) => ({ id, label: id })),
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
          isVisible: (options) => {
            return options.status === 'streaming'
          },
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
