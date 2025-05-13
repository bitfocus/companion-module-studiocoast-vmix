import { VMixAction, ActionCallback } from './actions'
import { EmptyOptions, options } from '../utils'
import VMixInstance from '../index'

type MixSelectOptions = {
  mix: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | -2
  mixVariable: string
}

type BusSelectOptions = {
  value: 'Master' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
}

type ButtonShiftOptions = EmptyOptions

type MixSelectCallback = ActionCallback<'mixSelect', MixSelectOptions>
type BusSelectCallback = ActionCallback<'busSelect', BusSelectOptions>
type ButtonShiftCallback = ActionCallback<'buttonShift', ButtonShiftOptions>

export interface UtilActions {
  mixSelect: VMixAction<MixSelectCallback>
  busSelect: VMixAction<BusSelectCallback>
  buttonShift: VMixAction<ButtonShiftCallback>

  [key: string]: VMixAction<any>
}

export type UtilCallbacks =
  | MixSelectCallback
  | BusSelectCallback
  | ButtonShiftCallback

export const vMixUtilActions = (instance: VMixInstance, _sendBasicCommand: (action: Readonly<UtilCallbacks>) => Promise<void>): UtilActions => {
  return {
    mixSelect: {
      name: 'Util - Select Mix',
      description: 'Select a Mix for use with other Companion actions',
      options: [
        {
          type: 'dropdown',
          label: 'Mix',
          id: 'mix',
          default: 0,
          choices: [
            { id: 0, label: '1' },
            { id: 1, label: '2' },
            { id: 2, label: '3' },
            { id: 3, label: '4' },
            { id: 4, label: '5' },
            { id: 5, label: '6' },
            { id: 6, label: '7' },
            { id: 7, label: '8' },
            { id: 8, label: '9' },
            { id: 9, label: '10' },
            { id: 10, label: '11' },
            { id: 11, label: '12' },
            { id: 12, label: '13' },
            { id: 13, label: '14' },
            { id: 14, label: '15' },
            { id: 15, label: '16' },
            { id: -2, label: 'Variable' }
          ]
        },
        options.mixVariable
      ],
      callback: async (action) => {
        const mix = action.options.mix

        if (mix === -2) {
          const mixVariable = parseInt((await instance.parseOption(action.options.mixVariable))[instance.buttonShift.state], 10)
          if (isNaN(mixVariable) || mixVariable < 1 || mixVariable > 16) {
            instance.log('warn', 'Mix must be an integer between 1 and 16 inclusive')
            return
          }

          instance.routingData.mix = (mixVariable - 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
          instance.variables?.set({ mix_selected: mixVariable })
        } else {
          instance.routingData.mix = mix
          instance.variables?.set({ mix_selected: action.options.mix + 1 })
        }

        instance.variables?.updateVariables()
        instance.checkFeedbacks('mixSelect', 'inputPreview', 'inputLive')
      }
    },

    busSelect: {
      name: 'Util - Select Bus',
      description: 'Select a Bus for use with other Companion actions',
      options: [
        {
          type: 'dropdown',
          label: 'Bus',
          id: 'value',
          default: 'Master',
          choices: ['Master', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, label: id }))
        }
      ],
      callback: (action) => {
        instance.routingData.bus = action.options.value
        instance.variables?.updateVariables()
        instance.checkFeedbacks('busSelect', 'busMute', 'busSolo', 'busSendToMaster', 'busVolumeMeter', 'inputBusRouting', 'liveBusVolume')
      }
    },

    buttonShift: {
      name: 'Util - Toggle Shift',
      description: 'Toggles the current Shift state within this Companion vMix instance',
      options: [],
      callback: () => {
        instance.buttonShift.state = instance.buttonShift.state === 0 ? 1 : 0

        const feedbacks = [
          'buttonText',
          'buttonShift',
          'inputPreview',
          'inputLive',
          'overlayStatus',
          'videoTimer',
          'inputAudio',
          'inputAudioAuto',
          'inputVolumeMeter',
          'inputSolo',
          'inputBusRouting',
          'liveInputVolume',
          'inputVolumeLevel',
          'inputLoop',
          'videoCallAudioSource',
          'videoCallVideoSource',
          'inputSelectedIndex',
          'inputSelectedIndexBoolean',
          'selectedDestinationInput',
          'selectedDestinationLayer',
          'routableMultiviewLayer',
          'inputOnMultiview',
          'inputState'
        ]

        instance.checkFeedbacks(...feedbacks)
      }
    },
  }
}
