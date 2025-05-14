import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type VideoActionsOptions = {
  input: string
  inputType: boolean
  functionID: 'Play' | 'Pause' | 'PlayPause' | 'Restart' | 'LoopOn' | 'LoopOff' | 'Loop'
}

type VideoPlayheadOptions = {
  input: string
  inputType: boolean
  adjustment: 'Set' | 'Increase' | 'Decrease'
  value: number
}

type VideoMarkOptions = {
  input: string
  inputType: boolean
  functionID: 'MarkIn' | 'MarkOut' | 'MarkReset' | 'MarkResetIn' | 'MarkResetOut'
}

type VideoActionsCallback = ActionCallback<'videoActions', VideoActionsOptions>
type VideoPlayheadCallback = ActionCallback<'videoPlayhead', VideoPlayheadOptions>
type VideoMarkCallback = ActionCallback<'videoMark', VideoMarkOptions>

export interface MediaActions {
  videoActions: VMixAction<VideoActionsCallback>
  videoPlayhead: VMixAction<VideoPlayheadCallback>
  videoMark: VMixAction<VideoMarkCallback>

  [key: string]: VMixAction<any>
}

export type MediaCallbacks = VideoActionsCallback | VideoPlayheadCallback | VideoMarkCallback

export const vMixMediaActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): MediaActions => {
  return {
    videoActions: {
      name: 'Media - Playback Actions',
      description: 'Change Playback state/options of an Input',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Act on Preview instead of inputs',
          id: 'inputType',
          default: false
        },
        {
          type: 'dropdown',
          label: 'Options',
          id: 'functionID',
          default: 'Play',
          choices: [
            { id: 'Play', label: 'Play Video' },
            { id: 'Pause', label: 'Pause Video' },
            { id: 'PlayPause', label: 'Toggle Play and Pause' },
            { id: 'Restart', label: 'Restart Video' },
            { id: 'LoopOn', label: 'Loop Video On' },
            { id: 'LoopOff', label: 'Loop Video Off' },
            { id: 'Loop', label: 'Loop Video Toggle' }
          ]
        }
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]

        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`)
        }
      }
    },

    videoPlayhead: {
      name: 'Media - Adjust or Set Playhead',
      description: 'Change the playhead on an Input',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false
        },
        options.adjustment,
        {
          type: 'number',
          label: 'value (ms) - vMix will round to the nearest frame',
          id: 'value',
          default: 0,
          min: 0,
          max: Number.MAX_SAFE_INTEGER
        }
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]
        let text = action.options.value.toString()

        // URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
        if (action.options.adjustment === 'Increase') {
          text = '%2b%3d' + text
        } else if (action.options.adjustment === 'Decrease') {
          text = '-%3d' + text
        }

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetPosition Input=${action.options.inputType ? '0' : encodeURIComponent(input)}&Value=${text}`)
      }
    },

    videoMark: {
      name: 'Media - Mark Functions',
      description: 'Mark In and Out points of an input (Not Replay)',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Affect Preview instead of inputs',
          id: 'inputType',
          default: false
        },
        {
          type: 'dropdown',
          label: 'Function',
          id: 'functionID',
          default: 'MarkIn',
          choices: [
            { id: 'MarkIn', label: 'Mark In' },
            { id: 'MarkOut', label: 'Mark Out' },
            { id: 'MarkReset', label: 'Mark Reset' },
            { id: 'MarkResetIn', label: 'Mark Reset In' },
            { id: 'MarkResetOut', label: 'Mark Reset Out' }
          ]
        }
      ],
      callback: async (action, context) => {
        const input = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`)
      }
    }
  }
}
