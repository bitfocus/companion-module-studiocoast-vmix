import type { CompanionActionDefinitions, CompanionActionSchema } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import type VMixInstance from '../index.js'
import { type MixOptionEntry, type EmptyOptions, options } from '../utils.js'

export type OutputActionsSchema = {
  outputSet: CompanionActionSchema<{
    functionID: 'SetOutput2' | 'SetOutput3' | 'SetOutput4' | 'SetOutputExternal2' | 'SetOutputFullscreen' | 'SetOutputFullscreen2'
    value: 'Output' | 'Preview' | 'MultiView' | 'MultiView2' | 'Replay' | 'Mix' | 'Input'
    input: string
    mix: MixOptionEntry
  }>
  multicorderFunctions: CompanionActionSchema<{
    functionID: 'StartStopMultiCorder' | 'StartMultiCorder' | 'StopMultiCorder'
  }>
  recordingFunctions: CompanionActionSchema<{
    functionID: 'StartStopRecording' | 'StartRecording' | 'StopRecording'
  }>
  streamingFunctions: CompanionActionSchema<{
    functionID: 'StartStopStreaming' | 'StartStreaming' | 'StopStreaming'
    value: '' | '1' | '2' | '3' | '4' | '5'
  }>
  externalFunctions: CompanionActionSchema<{
    functionID: 'StartStopExternal' | 'StartExternal' | 'StopExternal'
  }>
  fullscreenFunctions: CompanionActionSchema<{
    functionID: 'Fullscreen' | 'FullscreenOff' | 'FullscreenOn'
  }>
  fadeToBlack: EmptyOptions
}

export const getOutputActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<OutputActionsSchema> => {
  return {
    outputSet: {
      name: 'Output - Set Output Source',
      description: 'Change what is displayed on the specified Output',
      options: [
        {
          type: 'dropdown',
          label: 'Select Output',
          id: 'functionID',
          default: 'SetOutput2',
          choices: [
            { id: 'SetOutput2', label: 'Output 2' },
            { id: 'SetOutput3', label: 'Output 3' },
            { id: 'SetOutput4', label: 'Output 4' },
            { id: 'SetOutputExternal2', label: 'Output External 2' },
            { id: 'SetOutputFullscreen', label: 'Output Fullscreen 1' },
            { id: 'SetOutputFullscreen2', label: 'Output Fullscreen 2' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Select Input Type',
          id: 'value',
          default: 'Output',
          choices: [
            { id: 'Output', label: 'Output (Program)' },
            { id: 'Preview', label: 'Preview' },
            { id: 'MultiView', label: 'Multiview' },
            { id: 'MultiView2', label: 'Multiview2' },
            { id: 'Replay', label: 'Replay' },
            { id: 'Mix', label: 'Mix' },
            { id: 'Input', label: 'Input' },
          ],
          disableAutoExpression: true,
        },
        {
          ...options.mixSelect,
          isVisibleExpression: `$(options:value) === 'Mix'`,
        },
        {
          ...options.input,
          isVisibleExpression: `$(options:value) === 'Input'`,
        },
      ],
      callback: async (action) => {
        let command = `FUNCTION ${action.options.functionID}`

        if (action.options.value === 'Mix') {
          command += ` Value=Mix&Mix=${action.options.mix}`
        } else if (action.options.value === 'Input') {
          const input = action.options.input
          command += ` Value=${action.options.value}&Input=${encodeURIComponent(input)}`
        } else {
          command += ` Value=${action.options.value}`
        }

        if (instance.tcp) return instance.tcp.sendCommand(command)
      },
    },

    multicorderFunctions: {
      name: 'Output - Multicorder',
      description: 'Start / Stop / Toggle Multicorder',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartStopMultiCorder',
          choices: [
            { id: 'StartMultiCorder', label: 'Start MultiCorder' },
            { id: 'StopMultiCorder', label: 'Stop MultiCorder' },
            { id: 'StartStopMultiCorder', label: 'Start / Stop MultiCorder' },
          ],
          expressionDescription: `Valid Values: 'StartMultiCorder', 'StopMultiCorder', 'StartStopMultiCorder'`,
        },
      ],
      callback: sendBasicCommand,
    },

    recordingFunctions: {
      name: 'Output - Recording',
      description: 'Start / Stop / Toggle Recording',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartRecording',
          choices: [
            { id: 'StartRecording', label: 'Start Recording' },
            { id: 'StopRecording', label: 'Stop Recording' },
            { id: 'StartStopRecording', label: 'Toggle Recording' },
          ],
          expressionDescription: `Valid Values: 'StartRecording', 'StopRecording', 'StartStopRecording'`,
        },
      ],
      callback: sendBasicCommand,
    },

    streamingFunctions: {
      name: 'Output - Streaming',
      description: 'Start / Stop / Toggle Streaming',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartStreaming',
          choices: [
            { id: 'StartStreaming', label: 'Start Stream' },
            { id: 'StopStreaming', label: 'Stop Stream' },
            { id: 'StartStopStreaming', label: 'Toggle Stream' },
          ],
          expressionDescription: `Valid Values: 'StartStreaming', 'StopStreaming', 'StartStopStreaming'`,
        },
        {
          type: 'dropdown',
          label: 'Stream Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: 1, label: '1' },
            { id: 2, label: '2' },
            { id: 3, label: '3' },
            { id: 4, label: '4' },
            { id: 5, label: '5' },
          ],
          expressionDescription: `Valid Values: 1 to 5, or empty for All`,
        },
      ],
      callback: async (action) => {
        let command = `FUNCTION ${action.options.functionID}`

        if (action.options.value != '') {
          command += ` value=${action.options.value}`
        }

        if (instance.tcp) return instance.tcp.sendCommand(command)
      },
    },

    externalFunctions: {
      name: 'Output - External',
      description: 'Start / Stop / Toggle External',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartExternal',
          choices: [
            { id: 'StartExternal', label: 'Start External' },
            { id: 'StopExternal', label: 'Stop External' },
            { id: 'StartStopExternal', label: 'Toggle External' },
          ],
          expressionDescription: `Valid Values: 'StartExternal', 'StopExternal', 'StartStopExternal'`,
        },
      ],
      callback: sendBasicCommand,
    },

    fullscreenFunctions: {
      name: 'Output - Fullscreen',
      description: 'Start / Stop / Toggle Fullscreen',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'FullscreenOn',
          choices: [
            { id: 'FullscreenOn', label: 'Fullscreen On' },
            { id: 'FullscreenOff', label: 'Fullscreen Off' },
            { id: 'Fullscreen', label: 'Fullscreen Toggle' },
          ],
          expressionDescription: `Valid Values: 'FullscreenOn', 'FullscreenOff', 'Fullscreen'`,
        },
      ],
      callback: sendBasicCommand,
    },

    fadeToBlack: {
      name: 'Output - Fade to Black',
      description: 'Toggle Fade to Black',
      options: [],
      callback: sendBasicCommand,
    },
  }
}
