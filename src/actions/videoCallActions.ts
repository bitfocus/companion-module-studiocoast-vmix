import { VMixAction, ActionCallback } from './actions'
import { options } from '../utils'
import VMixInstance from '../index'

type VideoCallAudioSourceOptions = {
  input: string
  value: 'Master' | 'Headphones' | 'BusA' | 'BusB' | 'BusC' | 'BusD' | 'BusE' | 'BusF' | 'BusG'
}

type VideoCallVideoSourceOptions = {
  input: string
  value: 'Output1' | 'Output2' | 'Output3' | 'Output4' | 'None'
}

type VideoCallAudioSourceCallback = ActionCallback<'videoCallAudioSource', VideoCallAudioSourceOptions>
type VideoCallVideoSourceCallback = ActionCallback<'videoCallVideoSource', VideoCallVideoSourceOptions>

export interface VideoCallActions {
  videoCallAudioSource: VMixAction<VideoCallAudioSourceCallback>
  videoCallVideoSource: VMixAction<VideoCallVideoSourceCallback>

  [key: string]: VMixAction<any>
}

export type VideoCallCallbacks = VideoCallAudioSourceCallback | VideoCallVideoSourceCallback

export const vMixVideoCallActions = (
  _instance: VMixInstance,
  sendBasicCommand: (action: Readonly<VideoCallCallbacks>) => Promise<void>
): VideoCallActions => {
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
            { id: 'BusG', label: 'G' }
          ]
        }
      ],
      callback: sendBasicCommand
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
            { id: 'None', label: 'None' }
          ]
        }
      ],
      callback: sendBasicCommand
    }
  }
}
