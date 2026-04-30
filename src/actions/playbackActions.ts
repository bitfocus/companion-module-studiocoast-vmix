import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type PlaybackActionsSchema = {
  videoActions: CompanionActionSchema<{
    input: string
    inputType: boolean
    functionID: 'Play' | 'Pause' | 'PlayPause' | 'Restart' | 'LoopOn' | 'LoopOff' | 'Loop'
  }>
  videoPlayhead: CompanionActionSchema<{
    input: string
    inputType: boolean
    adjustment: 'Set' | 'Increase' | 'Decrease'
    value: number
  }>
  videoMark: CompanionActionSchema<{
    input: string
    inputType: boolean
    functionID: 'MarkIn' | 'MarkOut' | 'MarkReset' | 'MarkResetIn' | 'MarkResetOut'
  }>
}

export const getPlaybackActions = (instance: VMixInstance, _sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<PlaybackActionsSchema> => {
  return {
    videoActions: {
      name: 'Playback - Playback Actions',
      description: 'Play, Pause, Restart, Loop',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Use Preview instead of inputs',
          id: 'inputType',
          default: false,
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
            { id: 'Loop', label: 'Loop Video Toggle' },
          ],
          expressionDescription: `Valid Values: 'Play', 'Pause', 'PlayPause', 'Restart', 'LoopOn', 'LoopOff', 'Loop'`,
        },
      ],
      callback: async (action) => {
        if (instance.tcp) {
          return instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(action.options.input)}`)
        }
      },
    },

    videoPlayhead: {
      name: 'Playback - Adjust or Set Playhead',
      description: 'Change the playhead on an Input',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Use Preview instead of inputs',
          id: 'inputType',
          default: false,
        },
        options.adjustment,
        {
          type: 'number',
          label: 'value in ms - vMix will round to the nearest frame',
          id: 'value',
          default: 0,
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
      callback: async (action) => {
        const input = action.options.input
        let text = action.options.value.toString()

        // URL Encode plus and equals symbols to perform addition/subtraction on value instead of setting to a value.
        if (action.options.adjustment === 'Increase') {
          text = '%2b%3d' + text
        } else if (action.options.adjustment === 'Decrease') {
          text = '-%3d' + text
        }

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION SetPosition Input=${action.options.inputType ? '0' : encodeURIComponent(input)}&Value=${text}`)
      },
    },

    videoMark: {
      name: 'Playback - Mark Functions',
      description: 'Mark In and Out points of an input (Not Replay)',
      options: [
        options.input,
        {
          type: 'checkbox',
          label: 'Use Preview instead of inputs',
          id: 'inputType',
          default: false,
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
            { id: 'MarkResetOut', label: 'Mark Reset Out' },
          ],
          disableAutoExpression: true,
        },
      ],
      callback: async (action) => {
        const input = action.options.input

        if (instance.tcp) return instance.tcp.sendCommand(`FUNCTION ${action.options.functionID} Input=${action.options.inputType ? '0' : encodeURIComponent(input)}`)
      },
    },
  }
}

export const vMixPlaybackFunctions = {
  videoActions: ['Play', 'Pause', 'PlayPause', 'Restart', 'LoopOn', 'LoopOff', 'Loop'],
  videoPlayhead: ['SetPosition'],
  videoMark: ['MarkIn', 'MarkOut', 'MarkReset', 'MarkResetIn', 'MarkResetOut'],
}
