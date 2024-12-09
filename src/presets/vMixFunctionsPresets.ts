import { combineRgb } from '@companion-module/base'
import { VMixPresetArray } from './presets'

export const getVMixFunctionsPresets = (): VMixPresetArray => {
  const vMixfunctionPresets: VMixPresetArray = [
    {
      category: 'vMix Functions',
      name: 'Toggle Multicorder',
      type: 'button',
      style: {
        text: 'Toggle Multicorder',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopMultiCorder', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'multiCorder', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Recording',
      type: 'button',
      style: {
        text: 'Toggle Recording',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopRecording', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'recording', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Stream',
      type: 'button',
      style: {
        text: 'Toggle Stream',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopStreaming', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'streaming', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Functions',
      name: 'Toggle External',
      type: 'button',
      style: {
        text: 'Toggle External',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'StartStopExternal', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'external', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Functions',
      name: 'Toggle Fullscreen',
      type: 'button',
      style: {
        text: 'Toggle Fullscreen',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'Fullscreen', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fullscreen', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Functions',
      name: 'Toggle FTB',
      type: 'button',
      style: {
        text: 'Toggle FTB',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'toggleFunctions', options: { functionID: 'FadeToBlack', value: '' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'status',
          options: { status: 'fadeToBlack', value: '' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    }
  ]

  return vMixfunctionPresets
}
