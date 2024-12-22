import { combineRgb } from '@companion-module/base'
import { VMixFeedback, FeedbackCallback } from './feedback'
import VMixInstance from '../index'

type DynamicOptions = {
  type: 'dynamicInput' | 'dynamicValue'
  number: number
  value: string
}

type StatusOptions = {
  status: 'connection' | 'fadeToBlack' | 'recording' | 'external' | 'streaming' | 'multiCorder' | 'fullscreen' | 'playList'
  value: '' | '0' | '1' | '2'
}

type DynamicCallback = FeedbackCallback<'dynamic', DynamicOptions>
type StatusCallback = FeedbackCallback<'status', StatusOptions>

export interface GeneralFeedbacks {
  dynamic: VMixFeedback<DynamicCallback>
  status: VMixFeedback<StatusCallback>
}

export type GeneralCallbacks = DynamicCallback | StatusCallback

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
            { id: 'dynamicValue', label: 'Dynamic Value' }
          ]
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
            { id: 3, label: '4' }
          ]
        },
        {
          type: 'textinput',
          label: 'Value',
          id: 'value',
          default: '',
          useVariables: true
        }
      ],
      defaultStyle: {
        bgcolor: combineRgb(255, 0, 0)
      },
      callback: async (feedback, context) => {
        const targetValue = (await instance.parseOption(feedback.options.value, context))[instance.buttonShift.state]
        const dynamic: string = instance.data[feedback.options.type][feedback.options.number]?.value

        return targetValue === dynamic
      }
    },

    status: {
      type: 'boolean',
      name: 'General - vMix Status',
      description: 'Current status of vMix, such as recording, external, etc...',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0)
      },
      options: [
        {
          type: 'dropdown',
          label: 'Status Type',
          id: 'status',
          default: 'connection',
          choices: ['connection', 'fadeToBlack', 'recording', 'external', 'streaming', 'multiCorder', 'fullscreen', 'playList'].map((id) => ({ id, label: id }))
        },
        {
          type: 'dropdown',
          label: 'Stream Feedback Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '0' },
            { id: '1', label: '1' },
            { id: '2', label: '2' }
          ],
          isVisible: (options) => {
            return options.status === 'streaming'
          }
        }
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
      }
    }
  }
}
