import { combineRgb } from '@companion-module/base'
import type { VMixPresetArray } from './presets'

export const getOverlayPresets = (): VMixPresetArray => {
  const overlayPresets: VMixPresetArray = [
    {
      category: 'Overlays',
      name: 'OVL All Off',
      type: 'button',
      style: {
        text: 'OVL All Off',
        size: '18',
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(0, 0, 0),
      },
      steps: [
        {
          down: [{ actionId: 'overlayFunctions', options: { type: 'OverlayInputAllOff', input: '', overlay: '1', mix: 1, mixVariable: '' } }],
          up: [],
        },
      ],
      feedbacks: [],
    },
  ]

  for (let i = 1; i < 9; i++) {
    overlayPresets.push(
      {
        category: 'Overlays',
        name: `Overlay ${i}`,
        type: 'text',
        text: '',
      },
      {
        category: 'Overlays',
        name: `Overlay ${1} Prgm`,
        type: 'button',
        style: {
          text: `Overlay ${1} Prgm`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'OverlayInput', input: '', overlay: `${i}`, mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Prv`,
        type: 'button',
        style: {
          text: `Overlay ${i} Prv`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'PreviewOverlayInput', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} In`,
        type: 'button',
        style: {
          text: `Overlay ${i} In`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'In', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Last`,
        type: 'button',
        style: {
          text: `Overlay ${i} Last`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'Last', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Out`,
        type: 'button',
        style: {
          text: `Overlay ${i} Out`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'Out', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Off`,
        type: 'button',
        style: {
          text: `Overlay ${i} Off`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'Off', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: 'overlayStatus',
            options: {
              input: '',
              overlay: i.toString(),
              fg: combineRgb(255, 255, 255),
              bgPreview: combineRgb(0, 255, 0),
              bgProgram: combineRgb(255, 0, 0),
            },
          },
        ],
      },
      {
        category: 'Overlays',
        name: `Overlay ${i} Zoom`,
        type: 'button',
        style: {
          text: `Overlay ${i} Zoom`,
          size: '14',
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: 'overlayFunctions',
                options: { type: 'Zoom', input: '', overlay: '1', mix: 1, mixVariable: '' },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [],
      },
    )
  }

  return overlayPresets
}
