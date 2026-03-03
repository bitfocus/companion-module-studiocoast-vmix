import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getAudioPresetPresets = (): VMixPresetArray => {
  const audioPresetPresets: VMixPresetArray = [
    {
      category: `Audio Presets`,
      name: 'Input Audio',
      type: 'text',
      text: 'Save/Load vMix Audio state',
    },

    {
      category: 'Audio Presets',
      name: 'Save Preset 1',
      type: 'button',
      style: {
        text: 'Save Preset 1',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'saveAudioPreset', options: { name: 'preset 1', overwrite: true, includeBusses: true, includeInputs: true, inputReference: 'title', filter: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },

    {
      category: 'Audio Presets',
      name: 'Load Preset 1',
      type: 'button',
      style: {
        text: 'Load Preset 1',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },

    {
      category: 'Audio Presets',
      name: 'Fade Preset 1',
      type: 'button',
      style: {
        text: 'Fade Preset 1',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
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
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },

    {
      category: 'Audio Presets',
      name: 'Load Preset 1 Routing',
      type: 'button',
      style: {
        text: 'Load Preset 1 Routing',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'loadAudioPreset',
              options: {
                name: 'preset 1',
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
            name: 'preset 1',
            busses: ['busRouting'],
            busFilter: '',
            inputs: ['inputRouting'],
            inputFilter: '',
          },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0),
          },
        },
      ],
    },

    {
      category: 'Audio Presets',
      name: 'Delete Preset 1',
      type: 'button',
      style: {
        text: 'Delete Preset 1',
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: 'deleteAudioPreset',
              options: {
                name: 'preset 1',
              },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },
  ]

  return audioPresetPresets
}
