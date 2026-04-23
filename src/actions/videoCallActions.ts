import type { CompanionActionDefinitions } from '@companion-module/base'
import type { SendBasicCommand } from './actions.js'
import { options } from '../utils.js'
import type VMixInstance from '../index.js'

export type VideoCallActionsSchema = {
  videoCallAudioSource: {
    options: {
      input: string
      value: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
    }
  }
  videoCallVideoSource: {
    options: {
      input: string
      value: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
    }
  }
  videoCallConnect: {
    options: {
      functionID: 'VideoCallConnect' | 'VideoCallReconnect'
      input: string
      name: string
      password: string
    }
  }
}

export const getVideoCallActions = (instance: VMixInstance, sendBasicCommand: SendBasicCommand): CompanionActionDefinitions<VideoCallActionsSchema> => {
  return {
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
          disableAutoExpression: true,
        },
        options.input,
        {
          type: 'textinput',
          label: 'Name',
          id: 'name',
          default: '',
          useVariables: true,
          isVisibleExpression: `$(options:functionID) === 'VideoCallConnect'`,
        },
        {
          type: 'textinput',
          label: 'Password',
          id: 'password',
          default: '',
          useVariables: true,
          isVisibleExpression: `$(options:functionID) === 'VideoCallConnect'`,
        },
      ],
      callback: async (action) => {
        if (action.options.functionID === 'VideoCallConnect') {
          if (instance.tcp) return instance.tcp.sendCommand(action.options.functionID + `Input=${action.options.input}&Value=${action.options.name},${action.options.password}`)
        } else {
          if (instance.tcp) return instance.tcp.sendCommand(action.options.functionID + `Input=${action.options.input}`)
        }
      },
    },

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
          expressionDescription: `Valid Values: 'Master', 'Headphones', 'BusA', 'BusB', 'BusC', 'BusD', 'BusE', 'BusF', 'BusG'`,
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
          expressionDescription: `Valid Values: 'Output1', 'Output2', 'Output3', 'Output4', 'None'`,
        },
      ],
      callback: sendBasicCommand,
    },
  }
}
