import { VMixAction, ActionCallback } from './actions'
import VMixInstance from '../index'

type OutputSetOptions = {
  functionID: 'SetOutput2' | 'SetOutput3' | 'SetOutput4' | 'SetOutputExternal2' | 'SetOutputFullscreen' | 'SetOutputFullscreen2'
  value: 'Output' | 'Preview' | 'MultiView' | 'Replay' | 'Input'
  input: string
}

type ToggleFunctionsOptions = {
  functionID:
    | 'StartStopMultiCorder'
    | 'StartMultiCorder'
    | 'StopMultiCorder'
    | 'StartStopRecording'
    | 'StartRecording'
    | 'StopRecording'
    | 'StartStopStreaming'
    | 'StartStreaming'
    | 'StopStreaming'
    | 'StartStopExternal'
    | 'StartExternal'
    | 'StopExternal'
    | 'Fullscreen'
    | 'FullscreenOff'
    | 'FullscreenOn'
    | 'FadeToBlack'
  value: '' | '0' | '1' | '2'
}

type OutputSetCallback = ActionCallback<'outputSet', OutputSetOptions>
type ToggleFunctionsCallback = ActionCallback<'toggleFunctions', ToggleFunctionsOptions>

export interface OutputActions {
  outputSet: VMixAction<OutputSetCallback>
  toggleFunctions: VMixAction<ToggleFunctionsCallback>

  [key: string]: VMixAction<any>
}

export type OutputCallbacks = OutputSetCallback | ToggleFunctionsCallback

export const vMixOutputActions = (instance: VMixInstance, _sendBasicCommand: (action: Readonly<OutputCallbacks>) => Promise<void>): OutputActions => {
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
            { id: 'SetOutputFullscreen2', label: 'Output Fullscreen 2' }
          ]
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
            { id: 'Replay', label: 'Replay' },
            { id: 'Input', label: 'Input' }
          ]
        },
        {
          type: 'textinput',
          label: 'Input',
          id: 'input',
          default: '1',
          tooltip: 'Number, Name, or GUID',
          useVariables: true,
          isVisible: (options) => options.value === 'Input'
        }
      ],
      callback: async (action) => {
        const input = (await instance.parseOption(action.options.input))[instance.buttonShift.state]
        let command = `FUNCTION ${action.options.functionID} Value=${action.options.value}`

        if (action.options.value === 'Input') {
          command += `&Input=${encodeURIComponent(input)}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      }
    },

    toggleFunctions: {
      name: 'Output - MultiCorder / Recording / Streaming',
      description: 'Start / Stop / Toggle vMix Output functions',
      options: [
        {
          type: 'dropdown',
          label: 'Output Function',
          id: 'functionID',
          default: 'StartStopMultiCorder',
          choices: [
            { id: 'StartStopMultiCorder', label: 'Start / Stop MultCorder' },
            { id: 'StartMultiCorder', label: 'Start MultCorder' },
            { id: 'StopMultiCorder', label: 'Stop MultCorder' },
            { id: 'StartStopRecording', label: 'Start / Stop Recording' },
            { id: 'StartRecording', label: 'Start Recording' },
            { id: 'StopRecording', label: 'Stop Recording' },
            { id: 'StartStopStreaming', label: 'Start / Stop Stream' },
            { id: 'StartStreaming', label: 'Start Stream' },
            { id: 'StopStreaming', label: 'Stop Stream' },
            { id: 'StartStopExternal', label: 'Start / Stop External' },
            { id: 'StartExternal', label: 'Start External' },
            { id: 'StopExternal', label: 'Stop External' },
            { id: 'Fullscreen', label: 'Fullscreen On / Off' },
            { id: 'FullscreenOn', label: 'Fullscreen On' },
            { id: 'FullscreenOff', label: 'Fullscreen Off' },
            { id: 'FadeToBlack', label: 'Fade To Black' }
          ]
        },
        {
          type: 'dropdown',
          label: 'Stream Value',
          id: 'value',
          default: '',
          choices: [
            { id: '', label: 'All' },
            { id: '0', label: '1' },
            { id: '1', label: '2' },
            { id: '2', label: '3' }
          ],
          isVisible: (options) => {
            const functionID = options.functionID + ''
            return functionID.includes('Streaming')
          }
        }
      ],
      callback: (action) => {
        let command = `FUNCTION ${action.options.functionID}`

        if (action.options.functionID.includes('Streaming') && action.options.value != '') {
          command += ` value=${action.options.value}`
        }

        if (instance.tcp) instance.tcp.sendCommand(command)
      }
    }
  }
}
