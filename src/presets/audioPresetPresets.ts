import type { CompanionPresetDefinitions, CompanionPresetSection } from '@companion-module/base'
import { type VMixInstanceTypes } from '../utils.js'

export const getAudioPresetDefinitions = (): CompanionPresetDefinitions<VMixInstanceTypes> => {
  const audioPresetDefinitions: CompanionPresetDefinitions<VMixInstanceTypes> = {
    audioPreset_save: {
      name: 'Save Preset',
      type: 'simple',
      style: {
        text: 'Save Preset',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [{ actionId: 'saveAudioPreset', options: { name: 'preset', overwrite: true, includeBusses: true, includeInputs: true, inputReference: 'title', filter: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    audioPreset_load: {
      name: 'Load Preset',
      type: 'simple',
      style: {
        text: 'Load Preset',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'loadAudioPreset',
              options: {
                name: 'preset 1',
                busses: ['busRouting', 'busVolumes', 'busMute', 'busSolo'],
                busFade: '0',
                busFilter: '',
                inputs: ['inputRouting', 'inputVolumes', 'inputMute', 'inputSolo', 'inputAudioAuto', 'inputChannelMixer'],
                inputFade: '0',
                inputFilter: '',
                commandDelay: '0',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'audioPresetActive',
          options: {
            name: 'preset 1',
            busses: ['busRouting', 'busVolumes', 'busMute', 'busSolo'],
            busFilter: '',
            inputs: ['inputRouting', 'inputVolumes', 'inputMute', 'inputSolo', 'inputAudioAuto', 'inputChannelMixer'],
            inputFilter: '',
          },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    audioPreset_fade: {
      name: 'Fade Preset 1',
      type: 'simple',
      style: {
        text: 'Fade Preset 1',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'loadAudioPreset',
              options: {
                name: 'preset 1',
                busses: ['busRouting', 'busVolumes', 'busMute', 'busSolo'],
                busFade: '500',
                busFilter: '',
                inputs: ['inputRouting', 'inputVolumes', 'inputMute', 'inputSolo', 'inputAudioAuto', 'inputChannelMixer'],
                inputFade: '500',
                inputFilter: '',
                commandDelay: '0',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'audioPresetActive',
          options: {
            name: 'preset 1',
            busses: ['busRouting', 'busVolumes', 'busMute', 'busSolo'],
            busFilter: '',
            inputs: ['inputRouting', 'inputVolumes', 'inputMute', 'inputSolo', 'inputAudioAuto', 'inputChannelMixer'],
            inputFilter: '',
          },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    audioPreset_routing: {
      name: 'Load Preset Routing',
      type: 'simple',
      style: {
        text: 'Load Preset Routing',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'loadAudioPreset',
              options: {
                name: 'preset',
                busses: ['busRouting'],
                busFade: '0',
                busFilter: '',
                inputs: ['inputRouting'],
                inputFade: '0',
                inputFilter: '',
                commandDelay: '0',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: 'audioPresetActive',
          options: {
            name: 'preset',
            busses: ['busRouting'],
            busFilter: '',
            inputs: ['inputRouting'],
            inputFilter: '',
          },
          style: {
            color: 0x000000,
            bgcolor: 0xff0000,
          },
        },
      ],
    },

    audioPreset_delete: {
      name: 'Delete Preset',
      type: 'simple',
      style: {
        text: 'Delete Preset',
        size: '14',
        color: 0xffffff,
        bgcolor: 0x000000,
      },
      steps: [
        {
          down: [
            {
              actionId: 'deleteAudioPreset',
              options: {
                name: 'preset',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
  }

  return audioPresetDefinitions
}

export const getAudioPresetStructure = (): CompanionPresetSection<VMixInstanceTypes>[] => {
  const structure: CompanionPresetSection<VMixInstanceTypes>[] = [
    {
      id: 'audioPresetlStructure',
      name: 'Audio Presets',
      description: 'Save / Load current audio bus & input state',
      definitions: [
        {
          id: 'audioPresets',
          type: 'simple',
          name: 'Audio Presets',
          description: 'Save the current state of vMix Busses and Inputs to ',
          presets: ['audioPreset_save', 'audioPreset_load', 'audioPreset_fade', 'audioPreset_routing', 'audioPreset_delete'],
        },
      ],
    },
  ]

  return structure
}
