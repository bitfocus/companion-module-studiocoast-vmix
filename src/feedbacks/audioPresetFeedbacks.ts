import { combineRgb } from '@companion-module/base'
import type { VMixFeedback, FeedbackCallback } from './feedback'
import type VMixInstance from '../index'

type CheckBusSettings = 'busRouting' | 'busVolumes' | 'busMute' | 'busSolo' | 'busFilter'
type CheckInputSettings = 'inputRouting' | 'inputVolumes' | 'inputMute' | 'inputSolo' | 'inputAudioAuto' | 'inputChannelMixer' | 'inputFilter'

type AudioPresetActiveOptions = {
  name: string
  busses: CheckBusSettings[]
  busFilter: string
  inputs: CheckInputSettings[]
  inputFilter: string
}

type AudioPresetActiveCallback = FeedbackCallback<'audioPresetActive', AudioPresetActiveOptions>

export interface AudioPresetFeedbacks {
  audioPresetActive: VMixFeedback<AudioPresetActiveCallback>
}

export type AudioPresetCallbacks = AudioPresetActiveCallback

export const vMixAudioPresetFeedbacks = (instance: VMixInstance): AudioPresetFeedbacks => {
  return {
    audioPresetActive: {
      type: 'boolean',
      name: 'Audio Presets - Preset Active',
      description: 'Indicate if current vMix state matches a preset',
      defaultStyle: {
        color: combineRgb(0, 0, 0),
        bgcolor: combineRgb(255, 0, 0),
      },
      options: [
        {
          type: 'textinput',
          label: 'Audio Preset Name or Variable',
          id: 'name',
          default: '',
          tooltip: 'This can be the Name of a preset created within this Companion connection, or a variable containing Audio Preset data',
          useVariables: { local: true },
        },
        {
          type: 'multidropdown',
          label: 'Bus settings to match',
          id: 'busses',
          default: [],
          choices: [
            { id: 'busRouting', label: 'Bus Routing' },
            { id: 'busVolumes', label: 'Bus Volumes' },
            { id: 'busMute', label: 'Bus Mute' },
            { id: 'busSolo', label: 'Bus Solo' },
            { id: 'busFilter', label: 'Filter Busses to match' },
          ],
        },
        {
          type: 'textinput',
          label: 'List of Busses load, eg M, A, B (leave blank for all)',
          id: 'busFilter',
          default: '',
          tooltip: 'Comma separated',
          isVisibleExpression: `includes($(options:busses), 'busFilter')`,
          useVariables: { local: true },
        },
        {
          type: 'multidropdown',
          label: 'Input settings to match',
          id: 'inputs',
          default: [],
          choices: [
            { id: 'inputRouting', label: 'Input Routing' },
            { id: 'inputVolumes', label: 'Input Volumes' },
            { id: 'inputMute', label: 'Input Mute' },
            { id: 'inputSolo', label: 'Input Solo' },
            { id: 'inputAudioAuto', label: 'Input Auto Audio mixing' },
            { id: 'inputChannelMixer', label: 'Input Channel Mixer' },
            { id: 'inputFilter', label: 'Filter Busses to match' },
          ],
        },
        {
          type: 'textinput',
          label: 'List of inputs to match (leave blank for all)',
          id: 'inputFilter',
          default: '',
          tooltip: 'Comma separated',
          isVisibleExpression: `includes($(options:inputs), 'inputFilter')`,
          useVariables: { local: true },
        },
      ],
      callback: async (feedback) => {
        if (feedback.options.name.length === 0 || (feedback.options.busses.length === 0 && feedback.options.busses.length === 0)) return false
        let presetData = instance.audioPresets.presets[feedback.options.name]

        if (!presetData) {
          try {
            presetData = JSON.parse(feedback.options.name)
          } catch (_e) {
            return false
          }
        }

        if (!presetData.name || !Array.isArray(presetData.inputs) || !Array.isArray(presetData.busses)) {
          return false
        }

        const check = await instance.audioPresets.loadPreset(presetData, feedback.options as any, true)

        return check?.length === 0 || false
      },
    },
  }
}
