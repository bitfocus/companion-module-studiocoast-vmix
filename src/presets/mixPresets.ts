import { combineRgb } from '@companion-module/base'
import type { PresetCategory, VMixPresetArray } from './presets'
import type { MixOptionEntry } from '../utils'

export const getMixPresets = (): VMixPresetArray => {
  const mixPresets: VMixPresetArray = []

  for (let mix = 1; mix < 17; mix++) {
    mixPresets.push({
      category: `Mix ${mix}` as PresetCategory,
      name: 'Send Input to Preview',
      type: 'text',
      text: 'Inputs 1 to 8'
    })

    for (let input = 1; input < 9; input++) {
      mixPresets.push({
        category: `Mix ${mix}` as PresetCategory,
        name: `PRV ${input}`,
        type: 'button',
        style: {
          text: `PRV ${input}`,
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'previewInput',
                options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', input: input.toString() }
              }
            ],
            up: []
          }
        ],
        feedbacks: [
          {
            feedbackId: 'inputPreview',
            options: {
              mix: (mix - 1) as MixOptionEntry,
              mixVariable: '',
              input: input.toString(),
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(0, 255, 0),
              tally: ''
            }
          }
        ]
      })
    }

    mixPresets.push({
      category: `Mix ${mix}` as PresetCategory,
      name: 'Send Input to Program',
      type: 'text',
      text: 'Inputs 1 to 8'
    })

    for (let input = 1; input < 9; input++) {
      mixPresets.push({
        category: `Mix ${mix}` as PresetCategory,
        name: `PGM ${input}`,
        type: 'button',
        style: {
          text: `PGM ${input}`,
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'programCut',
                options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', input: input.toString() }
              }
            ],
            up: []
          }
        ],

        feedbacks: [
          {
            feedbackId: 'inputLive',
            options: {
              mix: (mix - 1) as MixOptionEntry,
              mixVariable: '',
              input: input.toString(),
              fg: combineRgb(255, 255, 255),
              bg: combineRgb(255, 0, 0),
              tally: ''
            }
          }
        ]
      })
    }

    mixPresets.push(
      {
        category: `Mix ${mix}` as PresetCategory,
        name: 'Transition Preview to Program',
        type: 'text',
        text: ''
      },
      {
        category: `Mix ${mix}` as PresetCategory,
        name: 'Cut',
        type: 'button',
        style: {
          text: 'Cut',
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', functionID: 'Cut', duration: '1000' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: `Mix ${mix}` as PresetCategory,
        name: 'Fade',
        type: 'button',
        style: {
          text: 'Fade',
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [
              {
                actionId: 'transitionMix',
                options: { mix: (mix - 1) as MixOptionEntry, mixVariable: '', functionID: 'Fade', duration: '1000' }
              }
            ],
            up: []
          }
        ],
        feedbacks: []
      },
      {
        category: `Mix ${mix}` as PresetCategory,
        name: 'Auto',
        type: 'button',
        style: {
          text: 'Fade',
          size: '24',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0)
        },
        steps: [
          {
            down: [{ actionId: 'transition', options: { functionID: 'Transition1', mix: 0, mixVariable: '' } }],
            up: []
          }
        ],
        feedbacks: []
      }
    )
  }

  return mixPresets
}
