import type { CompanionFeedbackSchema } from '@companion-module/base'
import { type CompanionFeedbackDefinitions } from '@companion-module/base'
import type VMixInstance from '../index.js'

export type AudioPresetFeedbacksSchema = {
  audioPresetActive: CompanionFeedbackSchema<{
    name: string
    busses: ('busRouting' | 'busVolumes' | 'busMute' | 'busSolo' | 'busFilter')[]
    busFilter: string
    inputs: ('inputRouting' | 'inputVolumes' | 'inputMute' | 'inputSolo' | 'inputAudioAuto' | 'inputChannelMixer' | 'inputFilter')[]
    inputFilter: string
  }>
}

export const getAudioPresetFeedbacks = (instance: VMixInstance): CompanionFeedbackDefinitions<AudioPresetFeedbacksSchema> => {
  return {
    audioPresetActive: {
      type: 'boolean',
      name: 'Audio Presets - Preset Active',
      description: 'Indicate if current vMix state matches a preset',
      defaultStyle: { color: 0x000000, bgcolor: 0xff0000 },
      options: [
        {
          type: 'textinput',
          label: 'Audio Preset Name or Variable',
          id: 'name',
          default: '',
          description: 'This can be the Name of a preset created within this Companion connection, or a variable containing Audio Preset data',
          useVariables: true,
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
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'List of Busses load, eg M, A, B (leave blank for all)',
          id: 'busFilter',
          default: '',
          description: 'Comma separated',
          isVisibleExpression: `includes($(options:busses), 'busFilter')`,
          useVariables: true,
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
          disableAutoExpression: true,
        },
        {
          type: 'textinput',
          label: 'List of inputs to match (leave blank for all)',
          id: 'inputFilter',
          default: '',
          description: 'Comma separated',
          isVisibleExpression: `includes($(options:inputs), 'inputFilter')`,
          useVariables: true,
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
