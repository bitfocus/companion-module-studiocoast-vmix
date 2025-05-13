import { combineRgb } from '@companion-module/base'
import type { VMixButtonPreset, VMixPresetArray } from './presets'

export const getCallPresets = (): VMixPresetArray => {
  const callPresets: VMixPresetArray = []

  callPresets.push(
    {
      category: `vMix Call`,
      name: `vMix Call Presets`,
      type: 'text',
      text: 'Each preset will require you to enter the calls input in the Action and Feedback'
    },
    {
      category: `vMix Call`,
      name: `Audio Source`,
      type: 'text',
      text: ''
    },
    {
      category: 'vMix Call',
      name: `Audio\nSource\nMaster`,
      type: 'button',
      style: {
        text: `Audio\nSource\nMaster`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Master' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'Master' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Call',
      name: `Audio\nSource\nHeadphones`,
      type: 'button',
      style: {
        text: `Audio\nSource\nHeadphones`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: 'Headphones' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallAudioSource',
          options: { input: '', source: 'Headphones' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    ...['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((bus) => {
      return {
        category: 'vMix Call',
        name: `Audio\nSource\nBus ${bus}`,
        type: 'button',
        style: {
          text: `Audio\nSource\nBus ${bus}`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'videoCallAudioSource', options: { input: '', value: `Bus${bus}` as any } }],
            up: []
          }
        ],

        feedbacks: [
          {
            feedbackId: 'videoCallAudioSource',
            options: { input: '', source: `Bus${bus}` as any },
            style: {
              color: combineRgb(0, 0, 0),
              bgcolor: combineRgb(255, 0, 0)
            }
          }
        ]
      } as VMixButtonPreset
    }),
    {
      category: `vMix Call`,
      name: `Video Source`,
      type: 'text',
      text: ''
    },
    {
      category: 'vMix Call',
      name: `Video\nSource\nOutput 1`,
      type: 'button',
      style: {
        text: `Video\nSource\nOutput 1`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output1' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output1' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Call',
      name: `Video\nSource\nOutput 2`,
      type: 'button',
      style: {
        text: `Video\nSource\nOutput 2`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output2' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output2' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Call',
      name: `Video\nSource\nOutput 3`,
      type: 'button',
      style: {
        text: `Video\nSource\nOutput 3`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output3' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output3' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Call',
      name: `Video\nSource\nOutput 4`,
      type: 'button',
      style: {
        text: `Video\nSource\nOutput 4`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'Output4' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'Output4' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    },
    {
      category: 'vMix Call',
      name: `Video\nSource\nNone`,
      type: 'button',
      style: {
        text: `Video\nSource\nNone`,
        size: '14',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0)
      },
      steps: [
        {
          down: [{ actionId: 'videoCallVideoSource', options: { input: '', value: 'None' } }],
          up: []
        }
      ],
      feedbacks: [
        {
          feedbackId: 'videoCallVideoSource',
          options: { input: '', source: 'None' },
          style: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(255, 0, 0)
          }
        }
      ]
    }
  )

  return callPresets
}
