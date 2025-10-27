import type { VMixAction, ActionCallback, SendBasicCommand } from './actions'
import { options } from '../utils'
import type VMixInstance from '../index'

type VideoCallAudioSourceOptions = {
  input: string
  value: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
}

type VideoCallVideoSourceOptions = {
  input: string
  value: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
}

type VideoCallConnectOptions = {
  functionID: 'VideoCallConnect' | 'VideoCallReconnect'
  input: string
  name: string
  password: string
}

type VideoCallAudioSourceCallback = ActionCallback<'videoCallAudioSource', VideoCallAudioSourceOptions>
type VideoCallVideoSourceCallback = ActionCallback<'videoCallVideoSource', VideoCallVideoSourceOptions>
type VideoCallConnectCallback = ActionCallback<'videoCallConnect', VideoCallConnectOptions>

export interface VideoCallActions {
  videoCallAudioSource: VMixAction<VideoCallAudioSourceCallback>
  videoCallVideoSource: VMixAction<VideoCallVideoSourceCallback>
  videoCallConnect: VMixAction<VideoCallConnectCallback>

  [key: string]: VMixAction<any>
}

export type VideoCallCallbacks = VideoCallAudioSourceCallback | VideoCallVideoSourceCallback

export const vMixVideoCallActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): VideoCallActions => {
  return {
    videoCallAudioSource: {
      name: 'VideoCall - Select Audio Source',
      description: 'Routes an Audio Source to the Video Call Input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'value',
          default: 'BusA',
          choices: [
            { id: 'Master', label: 'Master' },
            { id: 'Headphones', label: 'Headphones' },
            { id: 'BusA', label: 'A' },
            { id: 'BusB', label: 'B' },
            { id: 'BusC', label: 'C' },
            { id: 'BusD', label: 'D' },
            { id: 'BusE', label: 'E' },
            { id: 'BusF', label: 'F' },
            { id: 'BusG', label: 'G' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    videoCallVideoSource: {
      name: 'VideoCall - Select Video Source',
      description: 'Routes a Video Source to the Video Call Input',
      options: [
        options.input,
        {
          type: 'dropdown',
          label: 'Select Output',
          id: 'value',
          default: 'Output1',
          choices: [
            { id: 'Output1', label: 'Output 1' },
            { id: 'Output2', label: 'Output 2' },
            { id: 'Output3', label: 'Output 3' },
            { id: 'Output4', label: 'Output 4' },
            { id: 'None', label: 'None' },
          ],
        },
      ],
      callback: sendBasicCommand,
    },

    videoCallConnect: {
      name: 'VideoCall - Connect / Reconnect',
      description: 'Connection or reconnect to a vMix Call (Requires vMix 28+)',
      options: [
        {
          type: 'dropdown',
          label: 'Select Output',
          id: 'functionID',
          default: 'VideoCallConnect',
          choices: [
            { id: 'VideoCallConnect', label: 'Connect' },
            { id: 'VideoCallReconnect', label: 'Reconnect' },
          ],
        },
        options.input,
        {
          type: 'textinput',
          label: 'Name',
          id: 'name',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.functionID === 'VideoCallConnect',
        },
        {
          type: 'textinput',
          label: 'Password',
          id: 'password',
          default: '',
          useVariables: { local: true },
          isVisible: (options) => options.functionID === 'VideoCallConnect',
        },
      ],
      callback: async (action, context) => {
        const selected = (await instance.parseOption(action.options.input, context))[instance.buttonShift.state]

        if (action.options.functionID === 'VideoCallConnect') {
          if (instance.tcp) return instance.tcp.sendCommand(action.options.functionID + `Input=${selected}`)
        } else {
          const name = (await instance.parseOption(action.options.name, context))[instance.buttonShift.state]
          const password = (await instance.parseOption(action.options.password, context))[instance.buttonShift.state]
          if (instance.tcp) return instance.tcp.sendCommand(action.options.functionID + `Input=${selected}&Value=${name},${password}`)
        }
      },
    },
  }
}
